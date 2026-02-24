import { useState } from 'react';
import AutocompleteInput from './AutocompleteInput';

interface SearchCheckboxesProps {
    options: string[];
    selectedItems: string[];
    onSelectionChange: (items: string[]) => void;
    placeholder?: string;
    maxSuggestions?: number;
    label?: string;
}

export default function SearchCheckboxes({
    options,
    selectedItems,
    onSelectionChange,
    placeholder = 'Search and select...',
    maxSuggestions = 5,
    label
}: SearchCheckboxesProps) {
    const [inputValue, setInputValue] = useState('');

    // Filter out already selected items from the autocomplete options
    const availableOptions = options.filter(
        option => !selectedItems.includes(option)
    );

    // Handle selection from autocomplete
    const handleSelect = (value: string) => {
        // Only add if not already selected
        if (!selectedItems.includes(value)) {
            onSelectionChange([...selectedItems, value]);
        }
        // Clear input after selection
        setInputValue('');
    };

    // Handle checkbox toggle
    const handleCheckboxToggle = (item: string) => {
        if (selectedItems.includes(item)) {
            // Remove item
            onSelectionChange(selectedItems.filter(i => i !== item));
        } else {
            // Add item
            onSelectionChange([...selectedItems, item]);
        }
    };

    // Handle removing an item (X button)
    const handleRemove = (item: string) => {
        onSelectionChange(selectedItems.filter(i => i !== item));
    };

    return (
        <div className="w-full">

            {/* Autocomplete Search Input */}
            <AutocompleteInput
                options={availableOptions}
                value={inputValue}
                onChange={setInputValue}
                onSelect={handleSelect}
                placeholder={placeholder}
                maxSuggestions={maxSuggestions}
                allowCustom={false} // Only allow selections from the list
                clearOnSelect={true}
            />

            {/* Selected Items as Checkboxes */}
            {selectedItems.length > 0 && (
                <div className="mt-2 space-y-1">
                    {selectedItems.map((item) => (
                        <div
                            key={item}
                            className="flex items-center justify-between px-3 py-1"
                        >
                            <label className="flex items-center gap-2 cursor-pointer flex-1">
                                <input
                                    type="checkbox"
                                    checked={true}
                                    onChange={() => handleCheckboxToggle(item)}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-sm">{item}</span>
                            </label>

                        </div>
                    ))}
                </div>
            )}

            {/* Empty state message */}
            {selectedItems.length === 0 && (
                <p className="mt-4 text-sm text-gray-500 italic">
                    No items selected. Search and select from the dropdown above.
                </p>
            )}
        </div>
    );
}

// import { useState, useRef, useEffect } from 'react';
// import AutocompleteInput from './AutocompleteInput'

// interface SearchCheckboxesProps {
//     options: string[];
//     selectedItems: string[];
//     onSelectionChange(items: string[]) => void;
//     placeholder?: string;
//     //do not allow custom inputs not from the list

// }

// export default function SearchCheckboxes({

//     options,
//     selectedItems,
//     onSelectionChange,
//     placeholder,

// }: SearchCheckboxesProps) {

//     const [inputValue, setInputValue] = useState('');

//     const availableOptions = options.filter(
//         opt => !selectedItems.includes(opt)
//     );

//     const handleSelect = (value: string) => {
//         const trimmedValue = value.trim();

//         // Only add if not already selected
//         if (trimmedValue && !selectedItems.includes(trimmedValue)) {
//             onSelectionChange([...selectedItems, trimmedValue]);
//         }

//         // Clear the input after selection
//         setInputValue('');
//     };




//     return (
//         <div>
//             <AutocompleteInput
//                 options={availableOptions}
//                 value={inputValue}
//                 onChange={setInputValue}
//                 onSelect={handleSelect}
//                 placeholder={placeholder}
//                 allowCustom={false}
//                 clearOnSelect={true}

//             />
//         </div>


//     );

// }

