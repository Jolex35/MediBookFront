import {Box, Card, Typography} from "@mui/material";

function DocList() {
    const [docs, setDocs] = useState([])



    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"} gap={3}>
            {docs.map((doc) => (
                <Card sx={{padding: 2}}>
                    <Typography>Nom du praticien</Typography>
                    <Typography>Adresse</Typography>
                    <Typography>Spécialité</Typography>
                    <Typography>Horaires</Typography>
                </Card>
            ))}
        </Box>
    )
}

export default DocList