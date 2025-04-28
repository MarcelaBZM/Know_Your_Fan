// src/components/DocumentUpload.jsx

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { createWorker } from "tesseract.js";
import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";

export default function DocumentUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const cpfRegex = /\d{3}\.\d{3}\.\d{3}\-\d{2}/;
  const rgRegex = /\d{1,2}\.\d{3}\.\d{3}\-\d{1}/;
  

  function validarDocumento(texto) {
    const hasCPF = cpfRegex.test(texto);
    const hasRG = rgRegex.test(texto);
    

    if (hasCPF && hasRG) {
      return { status: true, message: "✅ Documento validado com sucesso!" };
    } else {
      let faltando = [];
      if (!hasCPF) faltando.push("CPF");
      if (!hasRG) faltando.push("RG");
      
      return { status: false, message: `❌ Campos faltando: ${faltando.join(", ")}` };
    }
  }

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setIsProcessing(true);
    const file = acceptedFiles[0];

    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(file);
    await worker.terminate();

    const resultado = validarDocumento(text);
    setMensagem(resultado.message);
    setIsProcessing(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: false,
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-8 p-6"
    >
      <div 
        {...getRootProps()} 
        className={`furia-border rounded-lg p-10 text-center cursor-pointer transition-colors relative
          ${isDragActive ? "bg-primary/10" : "hover:bg-primary/5"}`}
      >
        <input {...getInputProps()} />
        {isProcessing ? (
          <Loader2 className="mx-auto h-12 w-12 text-primary animate-spin" />
        ) : (
          <Upload className="mx-auto h-12 w-12 text-primary" />
        )}
        <p className="mt-4 text-sm text-gray-300">
          Arraste e solte seu documento de identidade aqui, ou clique para selecionar
        </p>
        <p className="mt-2 text-xs text-gray-400">
          Suporta arquivos JPG e PNG
        </p>
      </div>

      <div className="text-sm text-gray-400 text-center">
        <h3 className="font-semibold text-primary mb-2">Requisitos do Documento:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Documento oficial com foto (RG ou CNH)</li>
          <li>Imagem clara e legível</li>
          <li>Todos os dados visíveis</li>
          <li>Documento original (não aceitamos cópias)</li>
        </ul>
      </div>

      {mensagem && (
        <div className="mt-4 font-semibold text-white">
          {mensagem}
        </div>
      )}
    </motion.div>
  );
}
