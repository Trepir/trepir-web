import * as React from 'react';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { getDetails } from 'use-places-autocomplete';
import { useNavigate } from 'react-router-dom';
//  REDUX IMPORTS
import { useDispatch } from 'react-redux';
import { setMapViewport } from '../../Redux/reducers/mapSlice';

const CssTextField = styled(TextField)({
	fieldset: {
		border: 0,
	},
});

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
	offset: number;
	length: number;
}
interface StructuredFormatting {
	main_text: string;
	secondary_text: string;
	main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
	description: string;
	structured_formatting: StructuredFormatting;
}

export default function SearchGooglePlaces() {
	//  FOR REUX
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [value, setValue] = React.useState<PlaceType | null>(null);
	const [inputValue, setInputValue] = React.useState('');
	const [options, setOptions] = React.useState<readonly PlaceType[]>([]);

	const fetch = React.useMemo(
		() =>
			throttle(
				(
					request: { input: string },
					// eslint-disable-next-line
					callback: (results?: readonly PlaceType[]) => void
				) => {
					(autocompleteService.current as any).getPlacePredictions(
						request,
						callback
					);
				},
				200
			),
		[]
	);

	React.useEffect(() => {
		let active = true;

		if (!autocompleteService.current && (window as any).google) {
			autocompleteService.current = new (
				window as any
			).google.maps.places.AutocompleteService();
		}
		if (!autocompleteService.current) {
			return undefined;
		}

		if (inputValue === '') {
			setOptions(value ? [value] : []);
			return undefined;
		}

		fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
			if (active) {
				let newOptions: readonly PlaceType[] = [];

				if (value) {
					newOptions = [value];
				}

				if (results) {
					newOptions = [...newOptions, ...results];
				}

				setOptions(newOptions);
			}
		});

		return () => {
			active = false;
		};
	}, [value, inputValue, fetch]);

	return (
		<Autocomplete
			id="google-map-demo"
			sx={{
				width: 430,
				backgroundColor: 'white',
				zIndex: 3,
				borderRadius: 8,
				borderStyle: 'solid',
				borderWidth: 2,
				borderColor: 'rgba(28, 185, 133, 1)',
				'& .MuiOutlinedInput-notchedOutline': {
					borderStyle: 'none',
				},
				' & .MuiInputLabel-shrink': {
					display: 'none',
				},
				' & .MuiInputLabel-root': {
					display: 'none',
				},
				' & .MuiInputLabel-formControl': {
					display: 'none',
				},
				' & .MuiFormLabel-root': {
					display: 'none',
				},
				' & .MuiInputLabel-filled': {
					display: 'none',
				},
			}}
			getOptionLabel={(option) =>
				typeof option === 'string' ? option : option.description
			}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			onChange={async (event: any, newValue: any) => {
				setOptions(newValue ? [newValue, ...options] : options);
				setValue(newValue);
				//	//////////////ADDED DETAILS / MAP NAVIGATION LOGIC HERE //////////////////////////////
				if (newValue) {
					try {
						const details: any = await getDetails({
							placeId: newValue.place_id.toString(),
							fields: ['name', 'formatted_address', 'photos', 'geometry'],
						});
						dispatch(setMapViewport(details.geometry.viewport));
						navigate('./map');
					} catch (error) {
						console.log(error);
					}
				}
				//	////////////// ///////////////////////////////////////////////////////
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => (
				<CssTextField
					{...params}
					label="Add a location"
					fullWidth
					// variant="standard"
				/>
			)}
			renderOption={(props, option) => {
				const matches =
					option.structured_formatting.main_text_matched_substrings;
				const parts = parse(
					option.structured_formatting.main_text,
					matches.map((match: any) => [
						match.offset,
						match.offset + match.length,
					])
				);

				return (
					<li {...props}>
						<Grid container alignItems="center">
							<Grid item>
								<Box
									component={LocationOnIcon}
									sx={{
										color: 'text.secondary',
										mr: 2,
										// width: 50,
									}}
								/>
							</Grid>
							<Grid item xs>
								{parts.map((part, index) => (
									<span
										key={index}
										style={{
											fontWeight: part.highlight ? 700 : 400,
										}}
									>
										{part.text}
									</span>
								))}
								<Typography
									component="span"
									variant="body2"
									color="text.secondary"
								>
									{option.structured_formatting.secondary_text}
								</Typography>
							</Grid>
						</Grid>
					</li>
				);
			}}
		/>
	);
}
