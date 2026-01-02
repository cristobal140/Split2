import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'; 

function SummaryCard({ name, amount, participationCount, totalItems, isTotal, index }) {
    
    const displayAmount = Math.round(amount).toLocaleString('es-CL');
    
    // Estilos dinámicos basados en si es la tarjeta de Total General o Individual
    const cardStyle = isTotal ? styles.totalCard : styles.individualCard;
    const amountTextStyle = isTotal ? styles.totalAmountText : styles.individualAmountText;
    const statusText = isTotal ? 'Total General' : (amount > 0 ? 'Debe pagar' : 'No debe');

    // Estilo del badge según el estado
    const badgeStyle = isTotal 
        ? [styles.statusBadge, styles.totalBadge]
        : [styles.statusBadge, (amount > 0 ? styles.positiveBadge : styles.neutralBadge)];


    return (
        // Usamos un ancho fijo (48%) para simular dos columnas en Flexbox
        <View style={[styles.baseCard, cardStyle, { width: isTotal ? '100%' : '48%' }]}> 
            
            <View style={styles.headerRow}>
                <Text style={styles.nameText}>{isTotal ? 'TOTAL GENERAL' : name}</Text>
                
                <View style={badgeStyle}>
                    <Text style={styles.statusText}>{statusText}</Text>
                </View>
            </View>

            <Text style={amountTextStyle}>${displayAmount}</Text>
            
            {/* Detalles de participación */}
            <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                    {isTotal ? (
                        `${totalItems} ítems en total`
                    ) : (
                        `Participó en ${participationCount} de ${totalItems} ítems`
                    )}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // --- Estilos Base ---
    baseCard: {
        padding: 16, 
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2, 
        marginBottom: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.gray800,
    },
    // --- Badges ---
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    // --- Estilos Individuales ---
    individualCard: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray200,
    },
    positiveBadge: { // Debe pagar
        backgroundColor: Colors.primary100, 
    },
    neutralBadge: { // No debe
        backgroundColor: Colors.gray100, 
    },
    individualAmountText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.gray800,
    },
    // --- Estilos Total General ---
    totalCard: {
        backgroundColor: Colors.primary600, 
    },
    totalBadge: {
        backgroundColor: Colors.primary500,
    },
    totalAmountText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
    },
    // --- Detalles ---
    detailRow: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.gray100,
    },
    detailText: {
        fontSize: 12,
        color: Colors.gray600,
    }
});

export default SummaryCard;