import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
    isOpen: boolean;
    onChange: (open: boolean) => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onChange,
    title,
    description,
    children
}) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                {/* Overlay */}
                <Dialog.Overlay
                    className="
                        fixed inset-0
                        bg-neutral-900/90
                        backdrop-blur-sm
                        z-50
                    "
                />
                {/* Modal Content */}
                <Dialog.Content
                    className="
                        fixed 
                        top-1/2 left-1/2
                        transform -translate-x-1/2 -translate-y-1/2
                        w-full max-w-[90%] md:max-w-[450px] 
                        max-h-[90%] overflow-y-auto 
                        rounded-md bg-neutral-800 
                        p-6 
                        focus:outline-none 
                        shadow-lg
                        z-50
                    "
                >
                    {/* Modal Header */}
                    <Dialog.Title
                        className="
                            text-xl 
                            text-center 
                            font-bold 
                            text-white 
                            mb-2
                        "
                    >
                        {title}
                    </Dialog.Title>
                    <Dialog.Description
                        className="
                            mb-4 
                            text-sm 
                            text-center 
                            text-neutral-400 
                            leading-normal
                        "
                    >
                        {description}
                    </Dialog.Description>

                    {/* Modal Body */}
                    <div className="flex flex-col gap-4">
                        {children}
                    </div>

                    {/* Close Button */}
                    <Dialog.Close asChild>
                        <button
                            className="
                                absolute 
                                top-4 right-4 
                                text-neutral-400 
                                hover:text-white 
                                focus:outline-none
                                transition 
                                duration-300
                            "
                        >
                            <IoMdClose size={24} />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
