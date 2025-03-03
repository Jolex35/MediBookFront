import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import DocCard from "./DocCard.tsx";
import DocType from "../../types/DocType.ts";

function DocList() {
    const [docs, setDocs] =useState<DocType[]>([
        {
            name: 'Dr. Dupont',
            email: 'dupont@mail.co',
            address: '1 rue du Docteur',
            speciality: 'Généraliste',
            description: 'Médecin généraliste spécialisé dans les maladies infectieuses',
        },
        {
            name: 'Dr. Durand',
            email: 'durand@mail.co',
            address: '2 rue du Docteur, 75000 Paris',
            speciality: 'Allergologue',
            description: 'Médecin généraliste spécialisé dans les maladies cardio-vasculaires',
        },
        {
            name: 'Dr. Dufour',
            email: 'dufour@mail.co',
            address: '3 rue du Docteur',
            speciality: 'Généraliste',
            description: 'Médecin généraliste spécialisé dans les maladies respiratoires et allergiques. Traite l\'asthme, la maladie pulmonaire obstructive chronique (MPOC), le cancer du poumon, la mucoviscidose, l\'apnée du sommeil et les maladies pulmonaires professionnelles',
        }
    ]);

    async function fetchDocs() {
        try {
            const response = await fetch('/api/docs');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data: DocType[] = await response.json();
            setDocs(data);
        } catch (error) {
            console.error('Failed to fetch docs:', error);
        }
    }

    useEffect(() => {
        fetchDocs();
    }, []);

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={3}>
            {docs.map((doc,index) => (
                <DocCard key={index} doc={doc}/>
            ))}
        </Box>
    )
}

export default DocList