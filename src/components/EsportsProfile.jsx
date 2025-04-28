// src/components/EsportsProfile.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gamepad as GameController, Trophy, Link as LinkIcon, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const esportsKeywords = [
  "e-sports", "furia", "csgo", "valorant", "lol", "league of legends", 
  "championship", "dota", "overwatch", "pubg", "fortnite"
];

function EsportsProfile({ onSubmit, initialData = {} }) {
  const [isValidating, setIsValidating] = useState(false);
  const [profileLinks, setProfileLinks] = useState([]);
  const { toast } = useToast();

  async function validateProfileLink(url) {
    setIsValidating(true);
    try {
      // Aceita links famosos diretamente
      const knownSites = ["faceit.com", "esportal.com", "gamersclub.com.br", "esea.net"];
      const isKnown = knownSites.some(site => url.includes(site));

      if (isKnown) {
        return true;
      }

      // Senão, tenta validar analisando o conteúdo
      const response = await fetch(url);
      const text = await response.text();
      const hasEsportsContent = esportsKeywords.some(keyword =>
        text.toLowerCase().includes(keyword.toLowerCase())
      );

      if (!hasEsportsContent) {
        toast({
          title: "Conteúdo Não Relevante",
          description: "O perfil não parece ter atividade relacionada a esports.",
          variant: "destructive",
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error("Erro na validação:", error);
      toast({
        title: "Erro na Validação",
        description: "Não foi possível validar o link. Tente novamente.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsValidating(false);
    }
  }

  async function handleAddLink(e) {
    e.preventDefault();
    const linkInput = e.target.profileLink;
    const url = linkInput.value.trim();

    if (!url) return;

    const isValid = await validateProfileLink(url);
    if (isValid) {
      setProfileLinks([...profileLinks, url]);
      linkInput.value = "";
      toast({
        title: "Link Adicionado",
        description: "Seu perfil foi validado e adicionado com sucesso!",
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.profileLinks = profileLinks;
    onSubmit(data);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <form onSubmit={handleAddLink} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="profileLink" className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-primary" />
            Adicionar Perfil de Esports
          </Label>
          <div className="flex gap-2">
            <Input
              id="profileLink"
              name="profileLink"
              placeholder="https://www.faceit.com/profile/..."
              className="bg-white/10 border-primary/20 text-white flex-1"
            />
            <Button 
              type="submit"
              disabled={isValidating}
              className="bg-primary hover:bg-primary/90"
            >
              {isValidating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Validar"
              )}
            </Button>
          </div>
        </div>
      </form>

      {profileLinks.length > 0 && (
        <div className="space-y-2">
          <Label>Perfis Validados</Label>
          <div className="space-y-2">
            {profileLinks.map((link, index) => (
              <div
                key={index}
                className="bg-white/5 p-2 rounded-md flex items-center justify-between"
              >
                <span className="text-sm truncate">{link}</span>
                <Trophy className="h-4 w-4 text-primary" />
              </div>
            ))}
          </div>
        </div>
      )}

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 pt-4 border-t border-primary/20"
      >
        <div className="space-y-2">
          <Label htmlFor="favoriteTeam" className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Time Favorito
          </Label>
          <Input
            id="favoriteTeam"
            name="favoriteTeam"
            placeholder="FURIA, MIBR, etc."
            defaultValue={initialData.favoriteTeam || ""}
            className="bg-white/10 border-primary/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="games" className="flex items-center gap-2">
            <GameController className="h-5 w-5 text-primary" />
            Jogos que Acompanha
          </Label>
          <Input
            id="games"
            name="games"
            placeholder="CS:GO, Valorant, etc."
            defaultValue={initialData.games || ""}
            className="bg-white/10 border-primary/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="events">Eventos que já Participou</Label>
          <Input
            id="events"
            name="events"
            placeholder="Major Rio 2022, ESL One, etc."
            defaultValue={initialData.events || ""}
            className="bg-white/10 border-primary/20 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchases">Compras Relacionadas</Label>
          <Input
            id="purchases"
            name="purchases"
            placeholder="Jerseys, Ingressos, etc."
            defaultValue={initialData.purchases || ""}
            className="bg-white/10 border-primary/20 text-white"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 furia-glow"
        >
          Finalizar Perfil
        </Button>
      </motion.form>
    </motion.div>
  );
}

export default EsportsProfile;
