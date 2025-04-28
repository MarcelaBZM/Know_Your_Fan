
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import UserForm from "@/components/UserForm";
import DocumentUpload from "@/components/DocumentUpload";
import SocialMedia from "@/components/SocialMedia";
import EsportsProfile from "@/components/EsportsProfile";

const steps = [
  { id: 1, title: "Informações Básicas" },
  { id: 2, title: "Upload de Documentos" },
  { id: 3, title: "Redes Sociais" },
  { id: 4, title: "Perfil Esports" },
];

const STORAGE_KEY = 'know-your-fan-data';

function RegistrationFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        const lastStep = Object.keys(parsedData).length;
        if (lastStep > 0 && lastStep < steps.length) {
          setCurrentStep(lastStep);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Progresso salvo!",
        description: "Suas informações foram salvas com sucesso.",
      });
    } else {
      toast({
        title: "Perfil Completo!",
        description: "Todas as informações foram salvas com sucesso.",
        variant: "success",
      });
      navigate('/profile');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      handleNext();
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar seus dados. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-black/40 backdrop-blur-lg rounded-xl p-8 shadow-2xl"
      >
        <div className="flex flex-col items-center mt-8 mb-12">
  <div className="flex items-center gap-4">
    <img src="/logo.png" alt="Logo" className="h-12" />
    <h1 className="text-4xl font-bold text-center">Know Your Fan</h1>
  </div>
</div>



        <div className="flex justify-between mb-8">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.id * 0.1 }}
              className={`flex items-center ${
                currentStep === step.id ? "text-primary" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep === step.id
                    ? "border-primary bg-primary/20"
                    : "border-gray-400"
                }`}
              >
                {step.id}
              </div>
              <span className="ml-2 hidden sm:inline">{step.title}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8">
          {currentStep === 1 && <UserForm onSubmit={handleSubmit} initialData={formData} />}
          {currentStep === 2 && <DocumentUpload onSubmit={handleSubmit} initialData={formData} />}
          {currentStep === 3 && <SocialMedia onSubmit={handleSubmit} initialData={formData} />}
          {currentStep === 4 && <EsportsProfile onSubmit={handleSubmit} initialData={formData} />}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="transition-all duration-200 hover:scale-105"
          >
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length && !formData.profileLinks?.length}
            className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
          >
            {currentStep === steps.length ? "Visualizar Perfil" : "Próximo"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default RegistrationFlow;
