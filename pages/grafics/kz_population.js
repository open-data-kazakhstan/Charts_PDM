import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Импорт стилей highlight.js
import 'github-markdown-css'; // Импорт стилей GitHub Markdown


const KzPopulation = () => {
  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedYear, setSelectedYear] = useState('2022');
  const [readmeText, setReadmeText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/TyuninaA/VercelTesting/177d66a2442bc9649fb8431a95f138e8b681965e/city_population.csv');
        const csvData = await response.text();
        processData(csvData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchReadme = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/TyuninaA/DoD/c742e3a17a7de5d4a54299f3c12b2022df8d1400/README.md');
        const readmeText = await response.text();
        setReadmeText(readmeText);
      } catch (error) {
        console.error('Error fetching README:', error);
      }
    };

    fetchData();
    fetchReadme();
  }, []);

  const processData = (csvData) => {
    const rows = csvData.split('\n').slice(1);

    const populationData = [];
    rows.forEach(row => {
      const [region, total, males, females] = row.split(',');
      populationData.push({ region, total: parseInt(total), males: parseInt(males), females: parseInt(females) });
    });

    setData(populationData);
  };

  useEffect(() => {
    if (data) {
      let filteredData = data;
      if (selectedRegion !== '') {
        filteredData = data.filter(item => item.region === selectedRegion);
      }

      if (chart) {
        chart.destroy();
      }

      const ctx = document.getElementById('populationChart');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: filteredData.map(item => item.region),
          datasets: [
            {
              label: 'Total Population',
              data: filteredData.map(item => item.total),
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 0.8)',
              borderWidth: 1
            },
            {
              label: 'Male Population',
              data: filteredData.map(item => item.males),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 0.8)',
              borderWidth: 1
            },
            {
              label: 'Female Population',
              data: filteredData.map(item => item.females),
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 0.8)',
              borderWidth: 1
            }
          ]
        },
        options: {
          indexAxis: 'y',
          barPercentage: 1,
          scales: {
            x: {
              beginAtZero: true
            }
          }
        }
      });

      setChart(newChart);
    }
  }, [data, selectedRegion]);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/TyuninaA/VercelTesting/177d66a2442bc9649fb8431a95f138e8b681965e/city_population.csv');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'city_population.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="center-text">Статистика населения по регионам Казахстана</h1>
  
      <div className="filter-panel">
        <div className="filter">
          <label htmlFor="regionSelect">Выберите регион:</label>
          <select id="regionSelect" value={selectedRegion} onChange={handleRegionChange}>
            <option value="">Все регионы</option>
            {data && data.map(item => (
              <option key={item.region} value={item.region}>{item.region}</option>
            ))}
          </select>
        </div>
  
        <div className="filter">
          <label htmlFor="yearSelect">Выберите год:</label>
          <select id="yearSelect" value={selectedYear} onChange={handleYearChange}>
            <option value="2022">2022</option>
          </select>
        </div>
      </div>
  
      <canvas id="populationChart" width="400" height="200"></canvas>
  
      <div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Регион</th>
              <th>Общее население</th>
              <th>Мужчины</th>
              <th>Женщины</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map(item => (
              <tr key={item.region}>
                <td>{item.region}</td>
                <td>{item.total}</td>
                <td>{item.males}</td>
                <td>{item.females}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="button-container">
        <button className="transparent-button" onClick={handleDownloadCSV}>
          <img src="/downloading.png" alt="Download CSV" />
        </button>
        <a href="https://github.com/open-data-kazakhstan/city-population.git" target="_blank" rel="noopener noreferrer">
          <img src="/github.png" alt="GitHub Repository"  width="50" height="50"/>
        </a>
      </div>
  
      <div>
        <h2>README.md:</h2>
        <div className="markdown-body">
          <ReactMarkdown>{readmeText}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default KzPopulation;
