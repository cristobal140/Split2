import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native'; // Importamos Share
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors'; 
import SummaryCard from './SummaryCard';

function SummarySection({ participants, summary, items }) {
    const totalItems = items.length;
    const { totals, totalGeneral, participationCounts } = summary;

    // --- FUNCIÓN PARA COMPARTIR ---
    const handleShare = async () => {
        try {
            // Construcción del mensaje para WhatsApp/Mensajería
            let message = `💰 *Resumen de Gastos - ShopSplit*\n\n`;
            
            participants.forEach((name, index) => {
                const amount = Math.round(totals[name] || 0).toLocaleString('es-CL');
                message += `${index + 1}. ${name}: $${amount}\n`;
            });

            message += `\n───────────────\n`;
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
            {/* CABECERA CON BOTÓN COMPARTIR */}
            <View style={styles.header}>
                <View style={styles.titleWrapper}>
                    <FontAwesome name="dollar" size={20} color={Colors.gray800} style={{ marginRight: 8 }} />
                    <Text style={styles.headerText}>Resumen de gastos</Text>
                </View>

                {/* BOTÓN PREMIUM */}
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
    container: {
        marginTop: 20,
        paddingBottom: 40, // Espacio extra al final para scroll
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    titleWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18, 
        fontWeight: '600',
        color: Colors.gray800,
    },
    // Estilo del botón compartir
    shareButton: {
        backgroundColor: Colors.primary500,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 25,
        elevation: 3, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    shareText: {
        color: Colors.white,
        fontSize: 13,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 32,
    },
    emptyText: {
        color: Colors.gray500,
        fontSize: 16,
    }
});

export default SummarySection;