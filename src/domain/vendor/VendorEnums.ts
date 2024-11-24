enum VendorDocumentTypes {
    ID_CARD = 'ID_CARD',
    PROOF_OF_WORK = 'PROOF_OF_WORK',
    DRIVING_LICENSE = 'DRIVING_LICENSE',
    PROFILE_PHOTO = 'PROFILE_PHOTO',
    SMART_SERVE_CERTIFICATION = 'SMART_SERVE_CERTIFICATION'
}

const VendorDocuments = [
    {
        document_type: VendorDocumentTypes.ID_CARD,
        document: null, // Replace with the document path or URL when available
        is_verified: "NO", // Default to false
        is_optional: "NO", // Default to false
        document_status: "PENDING", // Set based on application logic
        status_reason: "", // Set based on application logic
    },

    {
        document_type: VendorDocumentTypes.PROOF_OF_WORK,
        document: null, // Replace with the document path or URL when available
        is_verified: "NO", // Default to false
        is_optional: "NO", // Default to false
        document_status: "PENDING", // Set based on application logic
        status_reason: "", // Set based on application logic
    },

    {
        document_type: VendorDocumentTypes.DRIVING_LICENSE,
        document: null, // Replace with the document path or URL when available
        is_verified: "NO", // Default to false
        is_optional: "NO", // Default to false
        document_status: "PENDING", // Set based on application logic
        status_reason: "", // Set based on application logic
    },


    {
        document_type: VendorDocumentTypes.PROFILE_PHOTO,
        document: null, // Replace with the document path or URL when available
        is_verified: "NO", // Default to false
        is_optional: "NO", // Default to false
        document_status: "PENDING", // Set based on application logic
        status_reason: "", // Set based on application logic
    },




    {
        document_type: VendorDocumentTypes.SMART_SERVE_CERTIFICATION,
        document: null, // Replace with the document path or URL when available
        is_verified: "NO", // Default to false
        is_optional: "YES", // Default to false
        document_status: "PENDING", // Set based on application logic
        status_reason: "", // Set based on application logic
    },


]


export { VendorDocumentTypes, VendorDocuments }