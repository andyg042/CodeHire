import { useState } from 'react';
// import { X } from 'lucide-react';
import AutocompleteInput from './AutocompleteInput'; // Adjust the import path as needed

interface BadgeSelectorProps {
    options: string[];
    selectedItems: string[];
    onSelectionChange: (items: string[]) => void;
    placeholder?: string;
    label?: string;
    description?: string;
    maxSuggestions?: number;
    allowCustom?: boolean;
}
// TODO: This component is a bit buggy - down arrow selector doesnt work, the drop down appears quite often even when you are selecting a new component? huh?

const BadgeSelector: React.FC<BadgeSelectorProps> = ({
    options,
    selectedItems,
    onSelectionChange,
    placeholder = 'Start typing...',
    label,
    description,
    maxSuggestions = 10,
    allowCustom = true,
}) => {
    const [inputValue, setInputValue] = useState<string>('');

    // Filter out already selected items from the options
    const availableOptions = options.filter(option => !selectedItems.includes(option));

    const handleAdd = (): void => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !selectedItems.includes(trimmedValue)) {
            onSelectionChange([...selectedItems, trimmedValue]);
            setInputValue('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (allowCustom || availableOptions.some(opt =>
                opt.toLowerCase() === inputValue.trim().toLowerCase()
            )) {
                handleAdd();
            }
        }
    };

    const removeItem = (itemToRemove: string): void => {
        onSelectionChange(selectedItems.filter(item => item !== itemToRemove));
    };

    return (
        <div className="w-full">
            {label && (
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {label}
                </h2>
            )}

            {description && (
                <p className="text-gray-200 mb-4 text-sm">
                    {description}
                </p>
            )}

            <div className="flex gap-2" onKeyDown={handleKeyDown}>
                <div className="flex-1">
                    <AutocompleteInput
                        options={availableOptions}
                        value={inputValue}
                        onChange={setInputValue}
                        placeholder={placeholder}
                        maxSuggestions={maxSuggestions}
                    />
                </div>

                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={!inputValue.trim()}
                    className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Add
                </button>
            </div>

            {selectedItems.length > 0 && (
                <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                        {selectedItems.map((item) => (
                            <div
                                key={item}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                            >
                                <span>{item}</span>
                                <button
                                    type="button"
                                    onClick={() => removeItem(item)}
                                    className="ml-2 text-blue-500 hover:text-blue-900"
                                    aria-label={`Remove ${item}`}
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BadgeSelector;