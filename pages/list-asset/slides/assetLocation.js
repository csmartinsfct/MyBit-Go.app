import ReactGoogleMapLoader from "react-google-maps-loader";
import ReactGooglePlacesSuggest from "react-google-places-suggest";
import getConfig from 'next/config';
import {
  CarouselSlide,
  CarouselSlideMainTitle,
  CarouselSlideParagraph,
  CarouselSlideInput,
  CarouselSlideSelect,
} from 'components/CarouselSlide/';
const { publicRuntimeConfig } = getConfig();
export const AssetLocationSlide = ({
  maxWidthDesktop,
  handleInputChange,
  formData,
  countries,
  handleSelectSuggest,
}) => {
  const {
    assetCountry,
  } = formData;

  return (
    <CarouselSlide
      maxWidthDesktop={maxWidthDesktop}
    >
      <CarouselSlideMainTitle
        isLong
        isSmallMobile
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        Asset location?
      </CarouselSlideMainTitle>
      <CarouselSlideParagraph
        isCentered
        maxWidthDesktop={maxWidthDesktop}
      >
        This is where your asset is going to be once fully funded.
      </CarouselSlideParagraph>
      <ReactGoogleMapLoader
        params={{
          key: publicRuntimeConfig.GOOGLE_PLACES_API_KEY,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <ReactGooglePlacesSuggest
              autocompletionRequest={{input: formData.assetAddress1}}
              googleMaps={googleMaps}
              onSelectSuggest={handleSelectSuggest}
            >
              <CarouselSlideInput
                isCentered
                placeholder="Address Line 1"
                name="assetAddress1"
                onChange={e => handleInputChange(e)}
                value={formData.assetAddress1}
              />
            </ReactGooglePlacesSuggest>
          )}
      />
      <CarouselSlideInput
        isCentered
        placeholder="Address Line 2"
        name="assetAddress2"
        onChange={e => handleInputChange(e)}
      />
      <CarouselSlideInput
        isCentered
        placeholder="City/Town"
        name="assetCity"
        onChange={e => handleInputChange(e)}
        value={formData.assetCity}
      />
      <CarouselSlideSelect
        isCentered
        showSearch
        value={formData.userCountry}
        disabled={true}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
          0
        }
      >
        {countries.map(country => (
          <Option key={country} value={country}>
            {country}
          </Option>
        ))}
      </CarouselSlideSelect>
      <CarouselSlideInput
        isCentered
        placeholder="Province/Region"
        name="assetProvince"
        onChange={e => handleInputChange(e)}
        value={formData.assetProvince}
      />
      <CarouselSlideInput
        isCentered
        placeholder="Postal Code"
        name="assetPostalCode"
        onChange={e => handleInputChange(e)}
        value={formData.assetPostalCode}
      />
    </CarouselSlide>
  )
};
