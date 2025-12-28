// App.js (EN LA RAÍZ)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font'; 
import { FontAwesome } from '@expo/vector-icons'; 

// Importaciones de módulos internos
import Colors from './src/constants/Colors';
import ParticipantSection from './src/components/Participants/ParticipantSection';
import ItemSection from './src/components/Items/ItemSection'; 
import SummaryCard from './src/components/Summary/SummaryCard';
import SummarySection from './src/components/Summary/SummarySection';

// 2. Componente Central con Lógica (Basado en tu JS original)
function App() {
    // 🚨 NUEVO ESTADO PARA CONTROLAR LA CARGA DE FUENTES
    const [isLoadingComplete, setIsLoadingComplete] = useState(false); 

    // ESTADOS: Replicamos las variables de estado del JS original
    const [participants, setParticipants] = useState([]);
    const [items, setItems] = useState([]);
    const [nextItemId, setNextItemId] = useState(1);
    const [summary, setSummary] = useState({});

    // --- LÓGICA DE CARGA DE FUENTES ASÍNCRONA ---
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                // Carga la fuente de los iconos FontAwesome
                await Font.loadAsync({
                    ...FontAwesome.font, 
                });
            } catch (e) {
                console.warn('Error al cargar recursos:', e);
            } finally {
                setIsLoadingComplete(true);
            }
        }
        loadResourcesAndDataAsync();
    }, []);
    // --- FIN LÓGICA DE CARGA ---


    // --- Lógica de Participantes ---
    const addParticipant = (name) => {
        const trimmedName = name.trim();
        if (trimmedName && !participants.includes(trimmedName) && participants.length < 20) {
            setParticipants(prevParticipants => [...prevParticipants, trimmedName]);
        }
    };

    const removeParticipant = (nameToRemove) => {
        setParticipants(prevParticipants => prevParticipants.filter(p => p !== nameToRemove));
        
        setItems(prevItems => 
            prevItems.map(item => ({
                ...item,
                participants: item.participants.filter(p => p !== nameToRemove)
            }))
        );
    };

    const clearParticipants = () => {
        setParticipants([]);
        setItems(prevItems => prevItems.map(item => ({...item, participants: []})));
    };


    // --- Lógica de Ítems ---
    const addItem = (name, price) => {
        if (!name || isNaN(price) || price <= 0 || participants.length === 0) return;
        
        const newItem = {
            id: nextItemId,
            name: name.trim(),
            price: parseFloat(price),
            participants: [...participants]
        };
        
        setItems(prevItems => [...prevItems, newItem]);
        setNextItemId(prevId => prevId + 1);
    };

    const removeItem = (itemId) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const toggleParticipant = (itemId, participantName, isChecked) => {
        setItems(prevItems => 
            prevItems.map(item => {
                if (item.id !== itemId) return item;

                let updatedParticipants = isChecked
                    ? [...item.participants, participantName] 
                    : item.participants.filter(p => p !== participantName); 

                return { ...item, participants: updatedParticipants };
            })
        );
    };


    // --- Lógica de Cálculo del Resumen (Replicando updateSummary()) ---
    useEffect(() => {
        const totals = {};
        const participationCounts = {};
        const totalGeneral = items.reduce((sum, item) => sum + item.price, 0);

        if (participants.length === 0) {
            setSummary({ totals: {}, totalGeneral: 0, participationCounts: {} });
            return;
        }

        participants.forEach(participant => {
            totals[participant] = 0;
            participationCounts[participant] = 0;
        });
        
        items.forEach(item => {
            const participantCount = item.participants.length;
            if (participantCount > 0) {
                const amountPerParticipant = item.price / participantCount;
                item.participants.forEach(participant => {
                    totals[participant] += amountPerParticipant;
                    participationCounts[participant] += 1;
                });
            }
        });

        setSummary({ totals, totalGeneral, participationCounts });
    }, [participants, items]);


    // 🚨 MOSTRAR PANTALLA DE CARGA MIENTRAS SE CARGAN LAS FUENTES
    if (!isLoadingComplete) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary600} />
            </View>
        );
    }
    
    // --- Renderizado Nativo Principal ---
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>ShopSplit</Text> 
                    <Text style={styles.headerSubtitle}>Divide gastos entre amigos de manera justa</Text>
                </View>

                {/* Sección 1: Participantes */}
                <View style={styles.sectionContainer}>
                    <ParticipantSection 
                        participants={participants}
                        addParticipant={addParticipant}
                        removeParticipant={removeParticipant}
                        clearParticipants={clearParticipants}
                    />
                </View>

                {/* Sección 2: Lista de Compras (Ítems) */}
                <View style={styles.sectionContainer}>
                    <ItemSection
                        items={items}
                        participants={participants}
                        addItem={addItem}
                        removeItem={removeItem}
                        toggleParticipant={toggleParticipant}
                    />
                </View>

                {/* Sección 3: Resumen de gastos (PENDIENTE) */}
                <View style={styles.sectionContainer}>
                    <SummarySection
                        participants={participants}
                        summary={summary}
                        items={items}
                    />
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
}

// 3. Estilos Base Nativo
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.gray50,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16, 
        paddingVertical: 32, 
    },
    // --- Header ---
    header: {
        marginBottom: 32, 
    },
    headerTitle: {
        fontSize: 24, 
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.primary600,
        marginBottom: 8, 
    },
    headerSubtitle: {
        color: Colors.gray600,
        textAlign: 'center',
    },
    // --- Sección General ---
    sectionContainer: {
        marginBottom: 32, 
        backgroundColor: Colors.white,
        padding: 24, 
        borderRadius: 8, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, 
    },
    sectionHeader: {
        fontSize: 18, 
        fontWeight: '600',
        color: Colors.gray800,
    },
    // 🚨 NUEVO ESTILO: Contenedor de Carga
    loadingContainer: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
});

export default App;