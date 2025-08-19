import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { AlertCircleIcon, TrendingUpIcon, TrendingDownIcon, BarChart2Icon, NewspaperIcon, EyeIcon, InfoIcon, ArrowRightIcon } from 'lucide-react';
import CreditScoreChart from '../components/CreditScoreChart';
import CompanyCard from '../components/CompanyCard';
import AlertsWidget from '../components/AlertsWidget';
import NewsWidget from '../components/NewsWidget';
import * as THREE from 'three';
// Mock data for the dashboard
const watchlistCompanies = [{
  id: '1',
  name: 'Tesla, Inc.',
  ticker: 'TSLA',
  score: 82,
  change: 3,
  industry: 'Automotive'
}, {
  id: '2',
  name: 'Apple Inc.',
  ticker: 'AAPL',
  score: 91,
  change: -1,
  industry: 'Technology'
}, {
  id: '3',
  name: 'Microsoft Corp.',
  ticker: 'MSFT',
  score: 89,
  change: 0,
  industry: 'Technology'
}, {
  id: '4',
  name: 'Amazon.com Inc.',
  ticker: 'AMZN',
  score: 85,
  change: 2,
  industry: 'E-Commerce'
}];
export default function Dashboard() {
  const {
    user
  } = useUser();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Initialize Three.js scene for the 3D sentiment heatmap
  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    // Create cubes representing different sectors with color based on risk
    const createSectorCube = (x: number, y: number, z: number, riskScore: number) => {
      // Color from red (high risk) to green (low risk)
      const hue = riskScore * 120 / 100; // 0 = red, 120 = green
      const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.7,
        metalness: 0.3
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, y, z);
      cube.scale.y = 0.5 + riskScore / 100 * 2; // Height based on score
      scene.add(cube);
      return cube;
    };
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    // Create sector cubes with mock risk scores
    const sectors = [{
      name: 'Technology',
      score: 85
    }, {
      name: 'Finance',
      score: 72
    }, {
      name: 'Healthcare',
      score: 88
    }, {
      name: 'Energy',
      score: 60
    }, {
      name: 'Consumer',
      score: 76
    }, {
      name: 'Industrial',
      score: 65
    }, {
      name: 'Utilities',
      score: 80
    }, {
      name: 'Materials',
      score: 68
    }, {
      name: 'Real Estate',
      score: 55
    }];
    const cubes: THREE.Mesh[] = [];
    const gridSize = Math.ceil(Math.sqrt(sectors.length));
    sectors.forEach((sector, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const x = (col - gridSize / 2 + 0.5) * 1.5;
      const z = (row - gridSize / 2 + 0.5) * 1.5;
      cubes.push(createSectorCube(x, 0, z, sector.score));
    });
    camera.position.set(0, 5, 7);
    camera.lookAt(0, 0, 0);
    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // Rotate the entire scene slowly
      scene.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);
  return <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-gray-400">
          Dashboard overview • {new Date().toLocaleDateString()}
        </p>
      </div>
      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Credit Score Chart */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <BarChart2Icon size={20} className="mr-2 text-blue-500" />
                Credit Score Timeline
              </h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 bg-opacity-20 text-blue-400 rounded-md">
                  1D
                </button>
                <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md">
                  1W
                </button>
                <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md">
                  1M
                </button>
                <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md">
                  1Y
                </button>
              </div>
            </div>
            {/* Credit score chart component */}
            <CreditScoreChart />
          </div>
        </div>
        {/* Right column - Alerts */}
        <div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <AlertCircleIcon size={20} className="mr-2 text-red-500" />
                Recent Alerts
              </h2>
              <Link to="/watchlist" className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
                View all <ArrowRightIcon size={16} className="ml-1" />
              </Link>
            </div>
            {/* Alerts widget */}
            <AlertsWidget />
          </div>
          {/* News feed */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <NewspaperIcon size={20} className="mr-2 text-blue-500" />
                Latest News
              </h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">
                Refresh
              </button>
            </div>
            {/* News widget */}
            <NewsWidget />
          </div>
        </div>
      </div>
      {/* Watchlist section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <EyeIcon size={20} className="mr-2 text-blue-500" />
            Your Watchlist
          </h2>
          <Link to="/watchlist" className="text-sm text-blue-400 hover:text-blue-300 flex items-center">
            Manage watchlist <ArrowRightIcon size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {watchlistCompanies.map(company => <CompanyCard key={company.id} company={company} />)}
        </div>
      </div>
      {/* 3D Sentiment Heatmap */}
      <div className="mt-6">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <TrendingUpIcon size={20} className="mr-2 text-blue-500" />
              Sector Sentiment Heatmap (3D)
            </h2>
            <button className="text-sm text-gray-400 hover:text-white flex items-center">
              <InfoIcon size={16} className="mr-1" />
              How to read
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3 aspect-square">
              <canvas ref={canvasRef} className="w-full h-full rounded-lg bg-gray-900" />
            </div>
            <div className="md:w-1/3">
              <div className="bg-gray-900 p-4 rounded-lg h-full">
                <h3 className="text-lg font-medium mb-3">Sector Risk Levels</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technology</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">85</span>
                      <TrendingUpIcon size={16} className="ml-1 text-green-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Finance</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">72</span>
                      <TrendingDownIcon size={16} className="ml-1 text-yellow-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Energy</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">60</span>
                      <TrendingDownIcon size={16} className="ml-1 text-red-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Healthcare</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">88</span>
                      <TrendingUpIcon size={16} className="ml-1 text-green-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Real Estate</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">55</span>
                      <TrendingDownIcon size={16} className="ml-1 text-red-500" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-400">
                    Height and color indicate risk level. Green indicates lower
                    risk, red indicates higher risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}