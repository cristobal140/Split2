import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors'; 

function SummaryCard({ name, amount, participationCount, totalItems, isTotal, index }) {
    
    // Usamos el valor absoluto para mostrar el número siempre positivo en la UI
    const absAmount = Math.abs(amount);
    const displayAmount = Math.round(absAmount).toLocaleString('es-CL');
    
    // Lógica de estados: Saldo Neto
    const isPositive = amount > 0.1;  // Saldo a favor (le deben)
    const isNegative = amount < -0.1; // Saldo en contra (debe pagar)

    // Estilos dinámicos
    const cardStyle = isTotal ? styles.totalCard : styles.individualCard;
    const amountTextStyle = isTotal ? styles.totalAmountText : styles.individualAmountText;
    
    // Configuración del Badge (Estado)
    let statusText = 'Al día';
    let badgeStyle = [styles.statusBadge, styles.neutralBadge];

    if (isTotal) {
        statusText = 'Total General';
        badgeStyle = [styles.statusBadge, styles.totalBadge];
    } else if (isPositive) {
        statusText = 'Le deben';
        badgeStyle = [styles.statusBadge, styles.positiveBadge]; // Fondo verde
    } else if (isNegative) {
        statusText = 'Debe pagar';
        badgeStyle = [styles.statusBadge, styles.negativeBadge]; // Fondo rojo
    }

    return (
        <View style={[styles.baseCard, cardStyle, { width: isTotal ? '100%' : '48%' }]}> 
            <View style={styles.headerRow}>
                <Text style={styles.nameText} numberOfLines={1}>
                    {isTotal ? 'TOTAL GENERAL' : `${index + 1}. ${name}`}
                </Text>
                
                <View style={badgeStyle}>
                    <Text style={[
                        styles.statusText, 
                        isPositive && { color: '#065f46' }, // Texto verde oscuro
                        isNegative && { color: '#991b1b' }  // Texto rojo oscuro
                    ]}>
                        {statusText}
                    </Text>
                </View>
            </View>

            <Text style={amountTextStyle}>${displayAmount}</Text>
            
            <View style={styles.detailRow}>
                <Text style={styles.detailText}>
                    {isTotal ? (
                        `${totalItems} ítems en total`
                    ) : (
                        `En ${participationCount} de ${totalItems} ítems`
                    )}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    baseCard: {
        padding: 16, 
        borderRadius: 12,
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
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.gray800,
        flex: 1,
        marginRight: 4,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    individualCard: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.gray200,
    },
    // Nuevos colores para estados de deuda
    positiveBadge: { backgroundColor: '#d1fae5' }, // Verde éxito
    negativeBadge: { backgroundColor: '#fee2e2' }, // Rojo error
    neutralBadge: { backgroundColor: Colors.gray100 },
    
    individualAmountText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.gray800,
    },
    totalCard: {
        backgroundColor: Colors.primary600, 
    },
    totalBadge: {
        backgroundColor: Colors.primary500,
    },
    totalAmountText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Colors.white,
    },
    detailRow: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: Colors.gray100,
    },
    detailText: {
        fontSize: 11,
        color: Colors.gray600,
    }
});

export default SummaryCard;