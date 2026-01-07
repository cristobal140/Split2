import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors'; 
import SummaryCard from './SummaryCard';

function SummarySection({ participants, summary, items }) {
    const totalItems = items.length;
    const { totals, totalGeneral, participationCounts } = summary;

    // --- FUNCIÓN PARA COMPARTIR CON LIQUIDACIÓN DE DEUDAS ---
    const handleShare = async () => {
        try {
            // 1. Separar a las personas en deudores y acreedores basándose en el saldo neto
            let debtors = [];
            let creditors = [];

            participants.forEach(name => {
                const balance = Math.round(totals[name] || 0);
                if (balance < -1) {
                    debtors.push({ name, amount: Math.abs(balance) });
                } else if (balance > 1) {
                    creditors.push({ name, amount: balance });
                }
            });

            // 2. Construir el mensaje
            let message = `💰 *Liquidación de Gastos - ShopSplit*\n\n`;

            if (creditors.length === 0) {
                message += "¡Todos están al día! No hay deudas pendientes.\n";
            } else {
                // Algoritmo de reparto: El deudor le paga al acreedor hasta saldar la deuda
                // Hacemos una copia para no modificar el estado original
                let tempDebtors = debtors.map(d => ({ ...d }));
                let tempCreditors = creditors.map(c => ({ ...c }));

                tempCreditors.forEach(creditor => {
                    message += `👤 *A ${creditor.name} le deben:*\n`;
                    let hasPayments = false;

                    tempDebtors.forEach(debtor => {
                        if (debtor.amount > 0 && creditor.amount > 0) {
                            const payment = Math.min(debtor.amount, creditor.amount);
                            
                            if (payment > 0) {
                                message += `   └─ ${debtor.name}: $${Math.round(payment).toLocaleString('es-CL')}\n`;
                                debtor.amount -= payment;
                                creditor.amount -= payment;
                                hasPayments = true;
                            }
                        }
                    });
                    
                    if (!hasPayments) message += `   └─ (Nadie le debe)\n`;
                    message += `\n`;
                });
            }

            message += `───────────────\n`;
            message += `*TOTAL GENERAL: $${Math.round(totalGeneral).toLocaleString('es-CL')}*\n`;
            message += `\nGenerado por ShopSplit 📱`;

            await Share.share({ message });
        } catch (error) {
            console.log("Error al compartir:", error.message);
        }
    };

    if (participants.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <FontAwesome name="users" size={40} color={Colors.gray500} style={{ marginBottom: 8 }} />
                <Text style={styles.emptyText}>Añade participantes para ver el resumen</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleWrapper}>
                    <FontAwesome name="dollar" size={20} color={Colors.gray800} style={{ marginRight: 8 }} />
                    <Text style={styles.headerText}>Resumen de gastos</Text>
                </View>

                {totalItems > 0 && (
                    <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
                        <FontAwesome name="share-alt" size={16} color={Colors.white} />
                        <Text style={styles.shareText}>Compartir</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.gridContainer}>
                {participants.map((name, index) => (
                    <SummaryCard 
                        key={name}
                        name={name}
                        index={index}
                        amount={totals[name] || 0}
                        participationCount={participationCounts[name] || 0}
                        totalItems={totalItems}
                        isTotal={false}
                    />
                ))}
                
                {totalItems > 0 && (
                    <SummaryCard
                        key="total"
                        name="Total General"
                        amount={totalGeneral}
                        totalItems={totalItems}
                        isTotal={true}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginTop: 20, paddingBottom: 40 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 4 },
    titleWrapper: { flexDirection: 'row', alignItems: 'center' },
    headerText: { fontSize: 18, fontWeight: '600', color: Colors.gray800 },
    shareButton: { backgroundColor: Colors.primary500, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 25, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 },
    shareText: { color: Colors.white, fontSize: 13, fontWeight: 'bold', marginLeft: 8 },
    gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    emptyContainer: { alignItems: 'center', paddingVertical: 32 },
    emptyText: { color: Colors.gray500, fontSize: 16 }
});

export default SummarySection;