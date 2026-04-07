import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Composants
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BloodStocks from '../components/BloodStocks'; 
import ProcessSection from '../components/ProcessSection'; 
import StatsSection from '../components/StatsSection';
import BloodCenters from '../components/BloodCenters'; 
import DonorRegistration from '../components/DonorRegistration';
import LoginModal from '../components/LoginModal';
import Footer from '../components/Footer';
import UrgencyBanner from '../components/UrgencyBanner'; 

const Home = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeAlert, setActiveAlert] = useState(null);

  const [formData, setFormData] = useState({
    fullname: '',
    blood_group: '',
    phone: '',
    city: ''
  });

  const [loginData, setLoginData] = useState({ 
    matricule: '', 
    password: '',
    hospital: 'CNHU-HKM (Cotonou)'
  });

  useEffect(() => {
    const fetchCurrentAlert = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/current-alert');
        if (res.data && res.data.is_active) {
          setActiveAlert(res.data);
        }
      } catch (error) {
        console.error("Impossible de charger l'alerte", error);
      }
    };
    fetchCurrentAlert();
  }, []);

 const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // On envoie les données du formulaire à l'API Laravel
      const response = await axios.post('http://127.0.0.1:8000/api/donors', formData);

      if (response.status === 201) {
        // Si Laravel répond "Created", on affiche le message de succès
        setIsSubmitted(true);
        
        // Optionnel : On vide le formulaire pour les prochaines utilisations
        setFormData({
          fullname: '',
          blood_group: '',
          phone: '',
          city: ''
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error.response?.data);
      
      // Gestion des erreurs spécifiques de Laravel (ex: téléphone déjà utilisé)
      if (error.response?.status === 422) {
        alert("Ce numéro de téléphone est déjà enregistré.");
      } else {
        alert("Une erreur est survenue lors de l'enregistrement. Réessayez plus tard.");
      }
    }
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      matricule: loginData.matricule,
      password: loginData.password,
      hospital: loginData.hospital
    });

    if (response.data.token) {
      // 1. Stocker le token
      localStorage.setItem('ACCESS_TOKEN', response.data.token);
      
      // 2. SAUVEGARDER L'UTILISATEUR (La ligne manquante est ici !)
      // On transforme l'objet user en texte (JSON) pour le stocker
      localStorage.setItem('USER_DATA', JSON.stringify(response.data.user));

      // 3. Récupérer le rôle pour la redirection
      const userRole = response.data.user.role; 

      // 4. Fermer le modal
      setIsModalOpen(false);

      // 5. Redirection conditionnelle
      if (userRole === 'admin') {
        navigate('/admin');
      } else {
        navigate('/agent'); 
      }
    }
  } catch (error) {
    console.error("Erreur de connexion", error.response?.data);
    alert(error.response?.data?.message || "Identifiants invalides");
  }
};

  return (
    <div className="relative min-h-screen bg-white">
      <Navbar onOpenLogin={() => setIsModalOpen(true)} />

      {/* Conteneur flexible pour la bannière et le Hero */}
      <div className="flex flex-col h-[calc(100vh-70px)]">
        <UrgencyBanner alert={activeAlert} />
        <Hero />
      </div>

      <StatsSection />
      <ProcessSection />
      <BloodStocks />
      <BloodCenters />

      <DonorRegistration 
        formData={formData} 
        setFormData={setFormData} 
        handleSubmit={handleSubmit} 
        isSubmitted={isSubmitted} 
      />

      <Footer />

      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        loginData={loginData}
        setLoginData={setLoginData}
        handleLogin={handleLogin}
      />
    </div>
  );
};

export default Home;