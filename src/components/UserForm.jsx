
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function UserForm({ onSubmit, initialData = {} }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.cpf.match(/^\d{11}$/)) {
      alert("CPF deve conter 11 dígitos numéricos");
      return;
    }
    
    onSubmit(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={initialData.name || ""}
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          name="cpf"
          required
          defaultValue={initialData.cpf || ""}
          className="bg-white/10 border-white/20 text-white"
          pattern="\d{11}"
          title="CPF deve conter 11 dígitos numéricos"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Endereço</Label>
        <Input
          id="address"
          name="address"
          required
          defaultValue={initialData.address || ""}
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests">Interesses em Esports</Label>
        <Input
          id="interests"
          name="interests"
          placeholder="CS:GO, League of Legends, etc."
          defaultValue={initialData.interests || ""}
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full transition-all duration-200 hover:scale-105"
      >
        Salvar e Continuar
      </Button>
    </motion.form>
  );
}

export default UserForm;
