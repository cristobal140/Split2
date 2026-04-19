// App.js (EN LA RAÍZ)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font'; 
import { FontAwesome } from '@expo/vector-icons'; 

// Importaciones de módulos internos
import Colors from './src/constants/Colors';
import ParticipantSection from './src/components/Participants/ParticipantSection';
import ItemSection from './src/components/Items/ItemSection'; 
import SummarySection from './src/components/Summary/SummarySection';

function App() {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false); 

    const [participants, setParticipants] = useState([]);
    const [items, setItems] = useState([]);
    const [nextItemId, setNextItemId] = useState(1);
    const [summary, setSummary] = useState({});

    // --- BLOQUE CORREGIDO: Lógica de Carga ---
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
                // ESTO ES LO QUE SACA LA PANTALLA DE CARGA
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
    const addItem = (name, price, paidBy) => {
        if (!name || isNaN(price) || price <= 0 || !paidBy) return;
        
        const newItem = {
            id: nextItemId,
            name: name.trim(),
            price: parseFloat(price),
            participants: [...participants],
            paidBy: paidBy
        };
        
        setItems(prevItems => [...prevItems, newItem]);
        setNextItemId(prevId => prevId + 1);
    };

    const updateItemPaidBy = (itemId, newPayer) => {
        setItems(prevItems => 
            prevItems.map(item => item.id === itemId ? { ...item, paidBy: newPayer} : item)
        );
    };

    const updateItemPrice = (itemId, newPrice) => {
        const parsedPrice = parseFloat(newPrice);
        setItems(prevItems => 
            prevItems.map(item => item.id === itemId ? { ...item, price: isNaN(parsedPrice) ? 0 : parsedPrice } : item)
        );
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

    // --- Lógica de Cálculo del Resumen ---
    useEffect(() => {
        const balances = {};
        const participationCounts = {};
        const totalGeneral = items.reduce((sum, item) => sum + item.price, 0);

        if (participants.length === 0) {
            setSummary({ totals: {}, totalGeneral: 0, participationCounts: {} });
            return;
        }

        participants.forEach(p => {
            balances[p] = 0;
            participationCounts[p] = 0;
        });
        
        items.forEach(item => {
            const participantCount = item.participants.length;
            if (item.paidBy && balances.hasOwnProperty(item.paidBy)) {
                balances[item.paidBy] += item.price;
            }
            if (participantCount > 0) {
                const amountPerParticipant = item.price / participantCount;
                item.participants.forEach(participant => {
                    balances[participant] -= amountPerParticipant;
                    participationCounts[participant] += 1;
                });
            }
        });

        setSummary({ totals: balances, totalGeneral, participationCounts });
    }, [participants, items]);

    if (!isLoadingComplete) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.primary600} />
            </View>
        );
    }
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>ShopSplit</Text> 
                    <Text style={styles.headerSubtitle}>Divide gastos entre amigos de manera justa</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <ParticipantSection 
                        participants={participants}
                        addParticipant={addParticipant}
                        removeParticipant={removeParticipant}
                        clearParticipants={clearParticipants}
                    />
                </View>

                <View style={styles.sectionContainer}>
                    <ItemSection
                        items={items}
                        participants={participants}
                        addItem={addItem}
                        removeItem={removeItem}
                        toggleParticipant={toggleParticipant}
                        updateItemPaidBy={updateItemPaidBy}
                        updateItemPrice={updateItemPrice}
                    />
                </View>

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

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.gray50 },
    scrollView: { flex: 1 },
    scrollContent: { paddingHorizontal: 16, paddingVertical: 32 },
    header: { marginBottom: 32 },
    headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: Colors.primary600, marginBottom: 8 },
    headerSubtitle: { color: Colors.gray600, textAlign: 'center' },
    sectionContainer: { marginBottom: 32, backgroundColor: Colors.white, padding: 24, borderRadius: 8, elevation: 5 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }
});

export default App;