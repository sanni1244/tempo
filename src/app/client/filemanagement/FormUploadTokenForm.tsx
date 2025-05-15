"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { uploadFormFile } from "@/services/fileService";

interface Props {
  token: string;
}

export default function FormUploadTokenForm({ token }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", token);

    try {
      setStatus("Uploading...");
      const res = await uploadFormFile(formData);
      setStatus(res.message || "Upload successful");
    } catch (err) {
      setStatus("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
      <p>{status}</p>
    </form>
  );
}
