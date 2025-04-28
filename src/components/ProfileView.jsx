
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User, MapPin, Trophy, Gamepad, Link as LinkIcon, ShoppingBag } from "lucide-react";

function ProfileView() {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('know-your-fan-data');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
    navigate('/');
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-black/40 backdrop-blur-lg rounded-xl p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-8">
          <motion.h1 
            className="text-3xl font-bold text-white"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            Seu Perfil de Fã
          </motion.h1>
          <Button onClick={handleEdit} className="bg-primary hover:bg-primary/90">
            Editar Perfil
          </Button>
        </div>

        <div className="grid gap-8">
          <ProfileSection
            icon={<User className="h-6 w-6" />}
            title="Informações Pessoais"
            data={{
              "Nome": profileData.name,
              "CPF": profileData.cpf?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
              "Endereço": profileData.address
            }}
          />

          <ProfileSection
            icon={<Trophy className="h-6 w-6" />}
            title="Perfil Esports"
            data={{
              "Time Favorito": profileData.favoriteTeam,
              "Jogos": profileData.games,
              "Eventos": profileData.events
            }}
          />

          {profileData.profileLinks?.length > 0 && (
            <ProfileSection
              icon={<LinkIcon className="h-6 w-6" />}
              title="Perfis de Jogador"
              links={profileData.profileLinks}
            />
          )}

          {profileData.twitter || profileData.instagram || profileData.twitch ? (
            <ProfileSection
              icon={<LinkIcon className="h-6 w-6" />}
              title="Redes Sociais"
              data={{
                "Twitter": profileData.twitter,
                "Instagram": profileData.instagram,
                "Twitch": profileData.twitch
              }}
            />
          ) : null}

          {profileData.purchases && (
            <ProfileSection
              icon={<ShoppingBag className="h-6 w-6" />}
              title="Compras e Colecionáveis"
              data={{
                "Itens": profileData.purchases
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

function ProfileSection({ icon, title, data, links }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white/5 rounded-lg p-6 border border-primary/20"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-primary">{icon}</div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>

      {data && (
        <div className="grid gap-2">
          {Object.entries(data).map(([key, value]) => (
            value && (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-400">{key}:</span>
                <span className="text-white">{value}</span>
              </div>
            )
          ))}
        </div>
      )}

      {links && (
        <div className="grid gap-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
            >
              <LinkIcon className="h-4 w-4" />
              {link}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default ProfileView;
