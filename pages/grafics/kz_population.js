import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Импорт стилей highlight.js
import 'github-markdown-css'; // Импорт стилей GitHub Markdown

const KzPopulation = () => {
  const [data, setData] = useState(null);
  const [chart, setChart] = useState(null);
  const [selectedParameter, setSelectedParameter] = useState('All');
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
      if (selectedParameter !== 'All') {
        filteredData = data.filter(item => item.region === selectedParameter);
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
  }, [data, selectedParameter]);

  const handleParameterChange = (event) => {
    setSelectedParameter(event.target.value);
  };

  return (
    <div>
      <h1>Статистика населения по регионам Казахстана.</h1>
      <select value={selectedParameter} onChange={handleParameterChange}>
        <option value="All">All</option>
        {data && data.map(item => (
          <option key={item.region} value={item.region}>{item.region}</option>
        ))}
      </select>
      <canvas id="populationChart" width="400" height="200"></canvas>
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
