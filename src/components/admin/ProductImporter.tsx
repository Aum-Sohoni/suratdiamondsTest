import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Upload, FileText, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import Papa from "papaparse";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export const ProductImporter = ({ onImportSuccess }: { onImportSuccess: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStats, setUploadStats] = useState<{ total: number; success: number; failed: number } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
                setError("Please upload a valid CSV file.");
                setFile(null);
                return;
            }
            setFile(selectedFile);
            setError(null);
            parseCSV(selectedFile);
        }
    };

    const parseCSV = (file: File) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    setError(`Error parsing CSV: ${results.errors[0].message}`);
                    return;
                }

                // Basic validation of headers
                const headers = results.meta.fields || [];
                // Support both standard and Shopify headers
                const hasStandardHeaders = ["name", "price"].every(h => headers.includes(h));
                const hasShopifyHeaders = ["Title", "Variant Price"].every(h => headers.includes(h));

                if (!hasStandardHeaders && !hasShopifyHeaders) {
                    setError("Invalid CSV format. Required columns: 'name', 'price' OR 'Title', 'Variant Price' (Shopify).");
                    return;
                }

                // Pre-process data to handle Shopify variants (empty Title rows)
                // We use 'Handle' to group variants and fill down the Title
                let lastTitle = "";
                let lastHandle = "";

                const processed = results.data.map((row: any) => {
                    // For standard CSV, just return
                    if (row["name"]) return row;

                    // For Shopify
                    const handle = row["Handle"];
                    let title = row["Title"];

                    // If no title but handle matches previous, inherit title (Variant)
                    if (!title && handle && handle === lastHandle) {
                        title = lastTitle;
                    }

                    // Update tracker if we have a new title
                    if (title) {
                        lastTitle = title;
                        lastHandle = handle;
                    }

                    return { ...row, Title: title };
                });

                setParsedData(processed);
            },
            error: (err) => {
                setError(`Error parsing CSV: ${err.message}`);
            }
        });
    };

    const getCategoryFromShopify = (record: any): string => {
        const type = (record["Type"] || record["Product Category"] || "").toLowerCase();
        const title = (record["Title"] || "").toLowerCase();

        if (type.includes("ring") || title.includes("ring")) return "rings";
        if (type.includes("necklace") || title.includes("necklace")) return "necklaces";
        if (type.includes("bracelet") || title.includes("bracelet")) return "bracelets";
        if (type.includes("earring") || title.includes("earring")) return "earrings";

        return "others";
    };

    const cleanDescription = (html: string): string => {
        if (!html) return "";
        // Simple regex to strip HTML tags if needed, or keep them if rich text is supported.
        // For now, let's keep basic text but remove complex Shopify data attributes if they mess up display.
        // Actually, let's just return the HTML as the UI might support it or it's better to have it than nothing.
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    };

    const mapRecordToProduct = (record: any) => {
        // Handle Shopify format vs Standard format
        let name = record["Title"] || record["name"];

        // Skip if no name (e.g. empty variant rows in some exports)
        if (!name) return null;

        // For Shopify: Append variant options to name to make it unique
        // e.g. "Ring - Yellow Gold"
        if (record["Title"]) { // It's a Shopify record
            const options = [];
            if (record["Option1 Value"] && record["Option1 Value"] !== "Default Title") options.push(record["Option1 Value"]);
            if (record["Option2 Value"]) options.push(record["Option2 Value"]);
            if (record["Option3 Value"]) options.push(record["Option3 Value"]);

            if (options.length > 0) {
                name = `${name} (${options.join(", ")})`;
            }
        }

        const price = parseFloat(record["Variant Price"] || record["price"] || "0");
        const category = record["category"] ? record["category"].toLowerCase() : getCategoryFromShopify(record);
        const description = record["Body (HTML)"] ? cleanDescription(record["Body (HTML)"]) : (record["description"] || null);
        const imageUrl = record["Image Src"] || record["image_url"] || null;

        // Extract meta fields if present or map standard ones
        const metal = record["Variant Grams"] ? `${record["Variant Grams"]}g ${record["Option1 Value"] || ""}` : (record["metal"] || null);

        return {
            name: name,
            name_lv: record.name_lv || null,
            name_ru: record.name_ru || null,
            price: price,
            category: category,
            description: description,
            description_lv: record.description_lv || null,
            description_ru: record.description_ru || null,
            image_url: imageUrl,
            metal: metal,
            carat: record.carat || null,
            clarity: record.clarity || null,
            cut: record.cut || null,
            color: record.color || null,
            is_active: true
        };
    };

    const handleImport = async () => {
        if (!parsedData.length) return;

        setIsUploading(true);
        let successCount = 0;
        let failedCount = 0;

        try {
            // Process in batches of 10 to avoid overwhelming the server
            const batchSize = 10;
            for (let i = 0; i < parsedData.length; i += batchSize) {
                const batch = parsedData.slice(i, i + batchSize);
                const productsToInsert = batch.map(mapRecordToProduct).filter(p => p !== null);

                if (productsToInsert.length === 0) continue;

                const { error } = await supabase
                    .from("products")
                    .insert(productsToInsert);

                if (error) {
                    console.error("Batch insert error:", error);
                    failedCount += batch.length;
                } else {
                    successCount += batch.length;
                }
            }

            setUploadStats({
                total: parsedData.length,
                success: successCount,
                failed: failedCount
            });

            if (successCount > 0) {
                toast.success(`Successfully imported ${successCount} products!`);
                onImportSuccess();
            }

            if (failedCount > 0) {
                toast.error(`Failed to import ${failedCount} products.`);
            }

        } catch (err) {
            console.error("Import error:", err);
            setError("An unexpected error occurred during import.");
        } finally {
            setIsUploading(false);
        }
    };

    const resetState = () => {
        setFile(null);
        setParsedData([]);
        setError(null);
        setUploadStats(null);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetState();
        }}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import CSV
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Import Products from CSV</DialogTitle>
                    <DialogDescription>
                        Upload a CSV file to add products in bulk.
                        Required columns: <span className="font-mono text-xs bg-muted px-1 rounded">name</span>, <span className="font-mono text-xs bg-muted px-1 rounded">price</span>, <span className="font-mono text-xs bg-muted px-1 rounded">category</span>.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 my-4">
                    {!uploadStats ? (
                        <>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleFileChange}
                                    disabled={isUploading}
                                />
                            </div>

                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {parsedData.length > 0 && !error && (
                                <div className="border rounded-md">
                                    <div className="p-2 bg-muted/50 border-b flex justify-between items-center">
                                        <span className="text-sm font-medium flex items-center">
                                            <FileText className="h-4 w-4 mr-2" />
                                            Preview ({parsedData.length} records)
                                        </span>
                                    </div>
                                    <ScrollArea className="h-[200px]">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Category</TableHead>
                                                    <TableHead>Price</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {parsedData.slice(0, 5).map((row, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{row.name || row.Title}</TableCell>
                                                        <TableCell>{row.category || (row["Type"] || "").split(" > ").pop()}</TableCell>
                                                        <TableCell>{row.price || row["Variant Price"]}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </ScrollArea>
                                    {parsedData.length > 5 && (
                                        <div className="p-2 text-xs text-muted-foreground text-center border-t">
                                            And {parsedData.length - 5} more...
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 space-y-4">
                            {uploadStats.failed === 0 ? (
                                <CheckCircle className="h-16 w-16 text-green-500" />
                            ) : (
                                <AlertCircle className="h-16 w-16 text-yellow-500" />
                            )}
                            <div className="text-center space-y-1">
                                <h3 className="text-lg font-medium">Import Complete</h3>
                                <p className="text-muted-foreground">
                                    Processed {uploadStats.total} records
                                </p>
                                <div className="flex gap-4 text-sm mt-2">
                                    <span className="text-green-600 font-medium">{uploadStats.success} Success</span>
                                    <span className="text-red-500 font-medium">{uploadStats.failed} Failed</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    {!uploadStats ? (
                        <>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleImport}
                                disabled={!parsedData.length || !!error || isUploading}
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Importing...
                                    </>
                                ) : (
                                    "Import Products"
                                )}
                            </Button>
                        </>
                    ) : (
                        <Button onClick={resetState}>Close</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
