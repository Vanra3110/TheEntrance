import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoice = (order) => {
    const doc = new jsPDF();

    // TheEntrance Brand Header
    doc.setFontSize(22);
    doc.setTextColor(41, 128, 185); // A nice blue shade
    doc.text('TheEntrance', 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Your ultimate tech destination', 14, 28);

    // Invoice Meta
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text('INVOICE', 196, 22, { align: 'right' });
    
    doc.setFontSize(10);
    doc.text(`Order ID: #${order._id}`, 196, 28, { align: 'right' });
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 196, 34, { align: 'right' });
    doc.text(`Status: ${order.status}`, 196, 40, { align: 'right' });

    // Separator line
    doc.setDrawColor(200);
    doc.line(14, 45, 196, 45);

    // Bill To
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Bill To / Ship To:', 14, 55);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    if (order.shippingAddress) {
        const { address, city, state, postalCode, country } = order.shippingAddress;
        doc.text(address || '', 14, 62);
        doc.text(`${city || ''}, ${state || ''} ${postalCode || ''}`, 14, 68);
        doc.text(country || '', 14, 74);
    } else {
        doc.text('N/A', 14, 62);
    }

    // Items Table
    const tableColumn = ["Item", "Quantity", "Price", "Total"];
    const tableRows = [];

    order.items.forEach(item => {
        // Strip out non-numeric characters for price if it's a string, or format it.
        // Assuming item.price is a string with currency symbol or a number.
        const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(String(item.price).replace(/[^0-9.-]+/g, ''));
        const quantity = item.quantity;
        const total = isNaN(itemPrice) ? item.price : `Rs. ${(itemPrice * quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
        const displayPrice = isNaN(itemPrice) ? item.price : `Rs. ${itemPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

        const itemData = [
            item.name,
            quantity.toString(),
            displayPrice,
            total
        ];
        tableRows.push(itemData);
    });

    autoTable(doc, {
        startY: 85,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185] },
        styles: { fontSize: 10, cellPadding: 4 },
    });

    // Total Section
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setTextColor(0);
    const formattedTotal = order.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    doc.text(`Total Amount: Rs. ${formattedTotal}`, 196, finalY, { align: 'right' });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Thank you for your business!', 105, finalY + 30, null, null, 'center');

    // Save PDF
    doc.save(`invoice_${order._id.substring(0, 8)}.pdf`);
};
