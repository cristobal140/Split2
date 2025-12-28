import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../constants/Colors'; 
import SummaryCard from './SummaryCard';

function SummarySection({ participants, summary, items }) {
    
    const totalItems = items.length;
    const { totals, totalGeneral, participationCounts } = summary;

    // Si no hay participantes, muestra el mensaje de inicio
    if (participants.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <FontAwesome name="users" size={40} color={Colors.gray500} style={{ marginBottom: 8 }} />
                <Text style={styles.emptyText}>Añade participantes para ver el resumen</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={styles.header}>
                <FontAwesome name="dollar" size={20} color={Colors.gray800} style={{ marginRight: 8 }} />
                <Text style={styles.headerText}>Resumen de gastos</Text>
            </View>

            {/* Contenedor de Tarjetas (Simula la cuadrícula) */}
            <View style={styles.gridContainer}>
                {participants.map(name => (
                    <SummaryCard 
                        key={name}
                        name={name}
                        amount={totals[name] || 0}
                        participationCount={participationCounts[name] || 0}
                        totalItems={totalItems}
                        isTotal={false}
                    />
                ))}
                
                {/* Tarjeta de Total General (Flota abajo si hay ítems) */}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18, 
        fontWeight: '600',
        color: Colors.gray800,
    },
    // Simula grid gap-4 md:grid-cols-2
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // Aseguramos espacio entre tarjetas si son dos columnas
        columnGap: 16, 
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