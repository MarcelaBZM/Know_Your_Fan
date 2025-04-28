
import React from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram, Twitch } from "lucide-react";

function SocialMedia({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
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
        <Label htmlFor="twitter" className="flex items-center gap-2">
          <Twitter className="h-5 w-5" />
          Twitter
        </Label>
        <Input
          id="twitter"
          name="twitter"
          placeholder="@username"
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="instagram" className="flex items-center gap-2">
          <Instagram className="h-5 w-5" />
          Instagram
        </Label>
        <Input
          id="instagram"
          name="instagram"
          placeholder="@username"
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="twitch" className="flex items-center gap-2">
          <Twitch className="h-5 w-5" />
          Twitch
        </Label>
        <Input
          id="twitch"
          name="twitch"
          placeholder="username"
          className="bg-white/10 border-white/20 text-white"
        />
      </div>

      <Button type="submit" className="w-full">
        Conectar Redes Sociais
      </Button>
    </motion.form>
  );
}

export default SocialMedia;
