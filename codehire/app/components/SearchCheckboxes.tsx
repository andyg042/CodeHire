import { useState, useRef, useEffect } from 'react';
import AutocompleteInput from './AutocompleteInput'

interface SearchCheckboxesProps {
    options: string[];
    selectedItems: string[];
    // onSelectionChange (items: string[]) => void;
    placeholder?: string;
    //do not allow custom inputs not from the list

}

export default function SearchCheckboxes({

    options,
    selectedItems,
    // onselectionChange,
    placeholder

}: SearchCheckboxesProps) {


    return (
        <div>
            {/* <AutocompleteInput
                options={availableOptions}
                value={inputValue}
                onChange={setInputValue}
                onSelect={handleSelect}
                placeholder={placeholder}
                maxSuggestions={maxSuggestions}
                allowCustom={allowCustom}
                clearOnSelect={true}


            /> */}
        </div>


    );

}

