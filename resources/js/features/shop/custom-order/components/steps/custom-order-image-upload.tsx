import { ImageIcon, XIcon } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import { FieldError } from '@/components/ui/field';
import { CustomOrderItemSchema } from '@/features/shop/custom-order/schema';

interface CustomOrderImageUploadProps {
    images: File[];
    onAppend: (files: File[]) => void;
    onRemove: (index: number) => void;
    isSubmitted: boolean;
    onDirty: () => void;
    onError: (error: string | null) => void;
}

export default function CustomOrderImageUpload({
    images,
    onAppend,
    onRemove,
    isSubmitted,
    onDirty,
    onError,
}: CustomOrderImageUploadProps) {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: (acceptedFiles) => {
            onAppend(acceptedFiles);
            onDirty();
        },
    });

    const validation = useMemo(() => CustomOrderItemSchema.shape.images.safeParse(images), [images]);
    const rawError = validation.success ? null : validation.error.format()._errors[0];

    useEffect(() => {
        onError(rawError);
    }, [rawError, onError]);

    const displayError = isSubmitted ? rawError : null;

    return (
        <div className="flex flex-col gap-4">
            <div
                {...getRootProps()}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-colors ${
                    isDragActive
                        ? 'bg-brand-primary-50 border-brand-primary-300'
                        : displayError
                          ? 'border-destructive bg-destructive/5'
                          : 'border-brand-neutral-400 hover:border-brand-primary-200'
                }`}
            >
                <input {...getInputProps()} />
                <ImageIcon className="mb-2 size-10 text-brand-neutral-600" />
                <p className="text-center text-sm text-brand-neutral-600">
                    {isDragActive ? 'Drop the images here...' : 'Drag & drop images here, or click to select'}
                </p>
            </div>

            {displayError && <FieldError>{displayError}</FieldError>}

            {images.length > 0 && (
                <div className="mt-2 grid grid-cols-4 gap-4">
                    {images.map((file, index) => (
                        <div
                            key={index}
                            className="group relative aspect-square overflow-hidden rounded-lg border"
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`preview-${index}`}
                                className="size-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    onRemove(index);
                                    onDirty();
                                }}
                                className="absolute top-1 right-1 rounded-full bg-destructive p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                                <XIcon className="size-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
