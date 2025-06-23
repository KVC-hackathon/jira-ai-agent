#!/bin/zsh

# Create a new directory for MD files
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$SCRIPT_DIR/data-source"
TARGET_DIR="$SCRIPT_DIR/data-source-md"

echo "Creating directory: $TARGET_DIR"
mkdir -p "$TARGET_DIR"

# Find all JSON files and process them
find "$SOURCE_DIR" -type f -name "*.json" | while read -r json_file; do
    # Get the relative path from SOURCE_DIR
    rel_path="${json_file#$SOURCE_DIR/}"
    # Create the directory structure in the target
    target_dir="$TARGET_DIR/$(dirname "$rel_path")"
    mkdir -p "$target_dir"
    
    # New filename with .md extension and appropriate suffix
    base_name="$(basename "$rel_path" .json)"
    
    # Add suffix based on directory
    if [[ "$rel_path" == normal_ticket/* && ! "$base_name" == *_ticket ]]; then
        base_name="${base_name}_ticket"
    elif [[ "$rel_path" == confluence/* && ! "$base_name" == *_confluence ]]; then
        base_name="${base_name}_confluence"
    fi
    
    target_file="$target_dir/$base_name.md"
    
    # Copy the content (converting from JSON to MD)
    cat "$json_file" >> "$target_file"    
    echo "Converted: $json_file -> $target_file"
done

echo "Conversion completed. Files saved to $TARGET_DIR"
