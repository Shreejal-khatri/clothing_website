import React, { useEffect, useState, useRef } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const AdminReports = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders');
        const data = await response.json();
        const completedOrders = data.filter(order => order.paymentStatus === "Completed");
        setOrders(completedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const calculateDailySales = (orders) => {
    const dailySales = {};
    if (!orders || orders.length === 0) return dailySales;

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      dailySales[orderDate] = (dailySales[orderDate] || 0) + order.totalPrice;
    });

    return dailySales;
  };

  const downloadPDF = async () => {
    const input = reportRef.current;
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('sales_report.pdf');
  };

  const dailySales = calculateDailySales(orders);
  const labels = Object.keys(dailySales);
  const salesData = Object.values(dailySales);

  // Calculate summary metrics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const reportingDays = labels.length;
  const averageDailyRevenue = reportingDays > 0 ? (totalRevenue / reportingDays).toFixed(2) : 0;

  const salesChartData = {
    labels,
    datasets: [
      {
        label: 'Daily Sales',
        data: salesData,
        backgroundColor: 'rgba(14, 224, 49, 0.84)',
        borderColor: 'rgba(17, 202, 17, 0.65)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Sales Report',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `NPR ${context.raw.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Total Amount (NPR)'
        },
        ticks: {
          callback: (value) => `NPR ${value.toLocaleString()}`
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '28px', margin: 0 }}>Sales Analytics Dashboard</h2>
        <button 
          onClick={downloadPDF}
          style={{
            padding: '10px 20px',
            backgroundColor: '#000000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Download PDF Report
        </button>
      </div>

      <div ref={reportRef}>
        {/* Summary Cards */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '10px' }}>Total Orders</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{totalOrders}</p>
          </div>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '10px' }}>Total Revenue</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>NPR {totalRevenue.toLocaleString()}</p>
          </div>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '10px' }}>Reporting Days</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{reportingDays}</p>
          </div>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '10px' }}>Avg Daily Revenue</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold' }}>NPR {averageDailyRevenue}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Bar Chart */}
          <div style={{ 
            width: '100%',
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>Daily Sales (Bar Chart)</h3>
            <div style={{ height: '500px' }}>
              <Bar data={salesChartData} options={options} />
            </div>
          </div>

          {/* Line Chart */}
          <div style={{ 
            width: '100%',
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>Sales Trend (Line Chart)</h3>
            <div style={{ height: '500px' }}>
              <Line data={salesChartData} options={options} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;