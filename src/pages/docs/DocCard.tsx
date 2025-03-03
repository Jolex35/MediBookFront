import {Box, Card, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import DocType from "../../types/DocType.ts";
import PlaceIcon from '@mui/icons-material/Place';
import {useState} from "react";

interface DocCardProps {
    doc: DocType
}


function DocCard({doc}: DocCardProps) {
    const [mois, setMois] = useState<string>("Janvier");
    const listMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    function handleChange(e : SelectChangeEvent<string> ) {
        setMois(e.target.value);
    }

    return (
        <Card sx={{padding: 2, width:"40%" ,borderRadius:3,display:"flex",flexDirection:"column", alignItems:'flex-start'}} elevation={3}>
            <Typography variant={"h5"} fontWeight={"bold"}>{doc.name}</Typography>
            <Box display={"flex"}>
                <PlaceIcon color={"disabled"}/>
                <Typography color={"textDisabled"} variant={"subtitle1"}>{doc.address}</Typography>
            </Box>
            <Typography>{doc.speciality}</Typography>
            <Card variant={"outlined"} sx={{ marginTop:1, width:"100%", height:60, overflow:"auto"}}>
                <Typography variant={"body2"} sx={{margin:1,textAlign: 'left', textJustify: 'inter-word'}} >{doc.description}</Typography>
            </Card>
            <Box display="flex" justifyContent="flex-start" width="100%" sx={{marginTop:1}}>
                <Select
                    labelId="a"
                    id="demo-simple-select"
                    value={mois}
                    label="Mois"
                    onChange={(e) => handleChange(e)}
                    size={"small"}
                >
                    {listMois.map((mois) => (
                    <MenuItem value={mois}>{mois}</MenuItem>
                    ))}
                </Select>

            </Box>
        </Card>
    )
}

export default DocCard