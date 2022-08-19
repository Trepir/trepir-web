import * as React from 'react';
// import * as yup from 'yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { getDetails } from 'use-places-autocomplete';
import { useDispatch } from 'react-redux';
import { submitTripLocation } from '../../../features/createTrip/createTripSlice';
import { submitAccommodationLocation } from '../../../features/createAccommodation/createAccommodationSlice';
import {
	submitTravelArrivalLocation,
	submitTravelDepartureLocation,
} from '../../../features/createTravel/createTravelSlice';
import { submitActivityLocation } from '../../../features/createActivity/createActivitySlice';

type Props = {
	inputLabel: string;
};

function loadScript(src: string, position: HTMLElement | null, id: string) {
	if (!position) {
		return;
	}

	const script = document.createElement('script');
	script.setAttribute('async', '');
	script.setAttribute('id', id);
	script.src = src;
	position.appendChild(script);
}

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

export default function TripLocationSearch(props: Props) {
	const { inputLabel } = props;
	//  FOR REDUX
	const dispatch = useDispatch();
	//  To give location coords to redux. Called by onChange
	async function handleLocationChange(placeDetails: any) {
		try {
			if (inputLabel === 'primaryLocation') {
				dispatch(submitTripLocation(placeDetails));
			}
			if (inputLabel === 'accommodationLocation') {
				dispatch(submitAccommodationLocation(placeDetails));
			}
			if (inputLabel === 'travelDepartureLocation') {
				dispatch(submitTravelDepartureLocation(placeDetails));
			}
			if (inputLabel === 'travelArrivalLocation') {
				dispatch(submitTravelArrivalLocation(placeDetails));
			}
			if (inputLabel === 'activityLocation') {
				dispatch(submitActivityLocation(placeDetails));
			}
		} catch (error) {
			console.log(error);
		}
	}
	//
	const [value, setValue] = React.useState<PlaceType | null>(null);
	const [inputValue, setInputValue] = React.useState('');
	const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
	const loaded = React.useRef(false);

	if (typeof window !== 'undefined' && !loaded.current) {
		if (!document.querySelector('#google-maps')) {
			loadScript(
				`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
				document.querySelector('head'),
				'google-maps'
			);
		}

		loaded.current = true;
	}

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
			id="location"
			sx={{ width: 300 }}
			getOptionLabel={(option) =>
				typeof option === 'string' ? option : option.description
			}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value}
			onChange={async (event: any, newValue: any | null) => {
				setOptions(newValue ? [newValue, ...options] : options);
				setValue(newValue);
				if (newValue) {
					const details = await getDetails({
						placeId: newValue.place_id.toString(),
					});
					handleLocationChange(details);
				}
			}}
			onInputChange={(event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => (
				<TextField {...params} label="Add a location" fullWidth />
			)}
			renderOption={(innerProps, option) => {
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
					<li {...innerProps}>
						<Grid container alignItems="center">
							<Grid item>
								<Box
									component={LocationOnIcon}
									sx={{ color: 'text.secondary', mr: 2 }}
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
