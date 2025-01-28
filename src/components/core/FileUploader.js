import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Parse from 'parse';

/**
 * DocumentUploader Component
 * A component for uploading files using Parse SDK.
 *
 * @param {Object} props Component props
 * @param {Array<string>} props.types Array of MIME types to restrict file types for uploading.
 * @param {boolean} props.open Controls whether the file input should be triggered.
 * @param {function} props.onUpload Callback function called after successful file upload.
 * @param {number} props.maxSize Maximum file size in bytes.
 * @param {function} props.onError Callback function called when an error occurs.
 *
 * @example
 * <DocumentUploader
 *   types={['image/jpeg', 'image/png']}
 *   open={true}
 *   onUpload={(file, fileMetadata) => console.log(file, fileMetadata)}
 *   onError={(error) => console.error(error)}
 *   maxSize={1024 * 1024} // 1MB
 * />
 */
const FileUploader = ({ types, open, onUpload, maxSize, onError }) => {
    const fileInputRef = useRef();

    useEffect(() => {
        if (open) {
            fileInputRef.current.click();
        }
    }, [open]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileMetadata = {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified
            };

            if (maxSize && fileMetadata.size > maxSize) {
                onError('File size exceeds the maximum limit');
                return;
            }

            const parseFile = new Parse.File(file.name, file);
            try {
                await parseFile.save();
                fileMetadata.url = parseFile.url();
                onUpload(parseFile, fileMetadata);
            } catch (error) {
                onError('Error uploading file: ' + error.message);
            }
        }
    };

    return (
        <input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={handleFileChange}
            accept={types?.join(', ')}
        />
    );
};

FileUploader.propTypes = {
    open: PropTypes.bool.isRequired,
    onUpload: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    types: PropTypes.arrayOf(PropTypes.string),
    maxSize: PropTypes.number,
};

FileUploader.defaultProps = {
    types: null,
    maxSize: null,
};

export default FileUploader;
