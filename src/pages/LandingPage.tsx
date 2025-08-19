import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { BarChart2Icon, TrendingUpIcon, SearchIcon, LineChartIcon, ArrowRightIcon } from 'lucide-react';
import * as THREE from 'three';
import LoginModal from '../components/LoginModal';
export default function LandingPage() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    login
  } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginAs, setLoginAs] = useState<'analyst' | 'admin'>('analyst');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3b82f6 // blue-500
    });
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    // Create globe
    const globeGeometry = new THREE.SphereGeometry(1, 32, 32);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    camera.position.z = 3;
    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.y += 0.001;
      globe.rotation.y += 0.001;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);
  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Would handle error feedback to user in a real app
    }
  };
  const openLoginModal = (role: 'analyst' | 'admin') => {
    setLoginAs(role);
    setShowLoginModal(true);
  };
  return <div className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* Three.js Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />
      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-500 rounded-md flex items-center justify-center mr-2">
              <BarChart2Icon size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">CreditAI</span>
          </div>
          <div className="space-x-4">
            <button onClick={() => openLoginModal('analyst')} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-transparent border border-blue-500 hover:bg-blue-500 hover:bg-opacity-20 transition-all">
              Login
            </button>
            <button onClick={() => openLoginModal('analyst')} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-all">
              Sign Up
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Real-Time Explainable{' '}
              <span className="text-blue-500">Credit Intelligence</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Advanced AI-powered credit analytics platform that provides
              real-time credit scoring with transparent explanations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => openLoginModal('analyst')} className="px-6 py-3 text-lg font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all flex items-center justify-center">
                Start as Analyst <ArrowRightIcon size={20} className="ml-2" />
              </button>
              <button onClick={() => openLoginModal('admin')} className="px-6 py-3 text-lg font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 transition-all flex items-center justify-center">
                Login as Admin <ArrowRightIcon size={20} className="ml-2" />
              </button>
            </div>
          </div>
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
              <div className="h-12 w-12 bg-blue-500 bg-opacity-20 rounded-md flex items-center justify-center mb-4">
                <TrendingUpIcon size={28} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Scores</h3>
              <p className="text-gray-400">
                Monitor creditworthiness in real-time with AI-powered analytics
                that update as new information becomes available.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
              <div className="h-12 w-12 bg-blue-500 bg-opacity-20 rounded-md flex items-center justify-center mb-4">
                <SearchIcon size={28} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Transparent Explanations
              </h3>
              <p className="text-gray-400">
                Understand exactly why a credit score changed with detailed
                feature-level explanations and event tracking.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all">
              <div className="h-12 w-12 bg-blue-500 bg-opacity-20 rounded-md flex items-center justify-center mb-4">
                <LineChartIcon size={28} className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Dashboard</h3>
              <p className="text-gray-400">
                Visualize trends, compare with traditional ratings, and get
                alerts on significant changes in one unified view.
              </p>
            </div>
          </div>
          {/* Demo Section */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">
              See it in action
            </h2>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart2Icon size={48} className="text-blue-500" />
                </div>
                <p className="text-gray-400 mb-4">
                  Interactive demo would appear here
                </p>
                <button onClick={() => openLoginModal('analyst')} className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 transition-all">
                  Try the full platform
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="relative z-10 bg-gray-800 py-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 bg-blue-500 rounded-md flex items-center justify-center mr-2">
                <BarChart2Icon size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">CreditAI</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2023 CreditAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} defaultEmail={loginAs === 'analyst' ? 'analyst@example.com' : 'admin@example.com'} />}
    </div>;
}