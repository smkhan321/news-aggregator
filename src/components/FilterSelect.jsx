import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";

const FilterSelect = ({ label, value, onChange, options, allOption = false }) => (
    <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
            input={<OutlinedInput label={label} />}
            value={value}
            onChange={onChange}
        >
            {allOption && <MenuItem value="">All {label}s</MenuItem>}
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
);

export default FilterSelect