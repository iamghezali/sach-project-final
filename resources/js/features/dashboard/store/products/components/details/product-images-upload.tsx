import { ImageIcon, Loader2Icon, UploadIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useUploadProductImages } from '../../mutations';

interface ProductImagesUploadProps {
    productId: number;
}

export default function ProductImagesUpload({ productId }: ProductImagesUploadProps) {
    const [stagedFiles, setStagedFiles] = useState<File[]>([]);

    const { mutateAsync: uploadImages, isPending } = useUploadProductImages(productId);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: (acceptedFiles) => {
            setStagedFiles((prev) => [...prev, ...acceptedFiles]);
        },
    });

    const removeFile = (index: number) => {
        setStagedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (stagedFiles.length === 0) {
            return;
        }

        try {
            await uploadImages({ images: stagedFiles });
            toast.success(`${stagedFiles.length} images uploaded successfully`);
            setStagedFiles([]);
        } catch (error: any) {
            toast.error(error.message || 'Failed to upload images');
        }
    };

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'} `}
            >
                <input {...getInputProps()} />
                <ImageIcon className="mb-2 size-10 text-muted-foreground/50" />
                <p className="text-center text-sm text-muted-foreground">
                    {isDragActive ? 'Drop the images here...' : 'Drag & drop images here, or click to select'}
                </p>
            </div>

            {stagedFiles.length > 0 && (
                <div className="rounded-lg border bg-muted/30 p-4">
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-sm font-medium">Staged for upload ({stagedFiles.length})</h4>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-destructive hover:text-destructive"
                            onClick={() => setStagedFiles([])}
                            disabled={isPending}
                        >
                            Clear All
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                        {stagedFiles.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="group relative aspect-square overflow-hidden rounded-md border bg-background"
                            >
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    className="size-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-destructive text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    disabled={isPending}
                                >
                                    <XIcon className="size-3" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={handleUpload}
                            disabled={isPending}
                            className="w-full sm:w-auto"
                        >
                            {isPending ? (
                                <>
                                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <UploadIcon className="mr-2 size-4" />
                                    Confirm Upload
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
