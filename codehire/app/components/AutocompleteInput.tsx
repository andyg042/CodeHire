import { useState, useRef, useEffect } from 'react';

interface AutocompleteInputProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    onSelect: (value: string) => void;
    placeholder?: string;
    label?: string;
    maxSuggestions?: number;
    allowCustom?: boolean; // New prop to allow custom input
    clearOnSelect?: boolean; // Whether to clear input after selection


}

export default function AutocompleteInput({
    options,
    value,
    onChange,
    onSelect,
    placeholder = 'Start typing...',
    label,
    maxSuggestions = 5,
    allowCustom = true, // Default to true
    clearOnSelect = false, // Default to NOT clearing (show selected value)


}: AutocompleteInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter options based on input
    useEffect(() => {
        if (value.trim() === '') {
            setFilteredOptions([]);
            setIsOpen(false);
            return;
        }

        const filtered = options
            .filter((option) =>
                option.toLowerCase().includes(value.toLowerCase())
            )
            .slice(0, maxSuggestions);

        setFilteredOptions(filtered);
        setIsOpen(filtered.length > 0);
        setHighlightedIndex(-1);
    }, [value, options, maxSuggestions]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     onChange(e.target.value);
    //     setIsOpen(true);

    // };


    const handleSelect = (option: string) => {
        onSelect(option);
        if (clearOnSelect) {
            onChange(''); // Clear the input
        } else {
            onChange(option); // Set the input to the selected value
        }
        setIsOpen(false);
        setHighlightedIndex(-1);
    };

    // const handleSelect = (option: string) => {
    //     isSelectingRef.current = true;
    //     onSelect(option);          // ✅ tell parent a job was chosen
    //     onChange(option);
    //     setIsOpen(false);
    //     setFilteredOptions([]); // ← This prevents reopening on refocus
    //     inputRef.current?.blur();
    // };

    // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (!isOpen) return;

    //     switch (e.key) {
    //         case 'ArrowDown':
    //             e.preventDefault();
    //             setHighlightedIndex((prev) =>
    //                 prev < filteredOptions.length - 1 ? prev + 1 : prev
    //             );
    //             break;
    //         case 'ArrowUp':
    //             e.preventDefault();
    //             setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    //             break;
    //         case 'Enter':
    //             // e.preventDefault();
    //             // if (highlightedIndex >= 0) {
    //             //     handleSelect(filteredOptions[highlightedIndex]);
    //             // } else {
    //             //     setIsOpen(false);
    //             // }
    //             // break;
    //             e.preventDefault();
    //             if (isOpen && highlightedIndex >= 0) {
    //                 // Select highlighted option from dropdown
    //                 handleSelect(filteredOptions[highlightedIndex]);
    //             } else if (value.trim() && allowCustom) {
    //                 // Accept custom input
    //                 handleSelect(value.trim());
    //             } else if (!allowCustom && filteredOptions.length > 0) {
    //                 // If custom not allowed, select first filtered option
    //                 handleSelect(filteredOptions[0]);
    //             }
    //             break;
    //         case 'Escape':
    //             setIsOpen(false);
    //             break;
    //     }
    // };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                if (isOpen && filteredOptions.length > 0) {
                    e.preventDefault();
                    setHighlightedIndex((prev) =>
                        prev < filteredOptions.length - 1 ? prev + 1 : prev
                    );
                }
                break;
            case 'ArrowUp':
                if (isOpen && filteredOptions.length > 0) {
                    e.preventDefault();
                    setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                }
                break;
            case 'Enter':
                e.preventDefault();
                if (isOpen && highlightedIndex >= 0) {
                    // Select highlighted option from dropdown
                    handleSelect(filteredOptions[highlightedIndex]);
                } else if (value.trim() && allowCustom) {
                    // Accept custom input
                    handleSelect(value.trim());
                } else if (!allowCustom && filteredOptions.length > 0) {
                    // If custom not allowed, select first filtered option
                    handleSelect(filteredOptions[0]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    return (
        <div className="relative w-full">
            {/* {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )} */}

            <input
                ref={inputRef}
                type="text"
                value={value}
                // onChange={handleInputChange}
                onChange={e => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                    if (value.trim() && filteredOptions.length > 0) {
                        setIsOpen(true);
                    }
                }}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#42e0ff] focus:border-white outline-none transition"
                autoComplete="off"
            />

            {isOpen && filteredOptions.length > 0 && (
                <div
                    ref={dropdownRef}
                    className="absolute z-10 w-full mt-1 text-[#313749] bg-gray-200 border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                >
                    {filteredOptions.map((option, index) => (
                        <div
                            key={option}
                            // onClick={() => handleSelect(option)}
                            onMouseDown={() => handleSelect(option)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            className={`px-4 py-2 cursor-pointer transition ${index === highlightedIndex
                                ? 'bg-[#42e0ff] text-[#313749]'
                                : 'hover:bg-gray-100'
                                }`}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}