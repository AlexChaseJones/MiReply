//AWS image file restrictions

Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});