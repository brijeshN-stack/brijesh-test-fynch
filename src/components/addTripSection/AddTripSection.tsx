import React, { useEffect, useRef, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import { TripsDataProps } from '@/types';
import { vehicleClasses, vehicles } from '@/redux/slices/vehiclesSlice';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { filterPublicTransport, handleWeekendRestrictions } from '@/utils/helpers';
import { selectLicenseConfigDetails } from '@/redux/slices/profileSlice';
import { AddTripContainer, DialogHeaderTypography } from '@/components/StyledComponents/styledComponents';
import AddTripRow from '@/components/addTripRow/AddTripRow';
import AddTripDialog from '@/components/addTripDialog/AddTripDialog';
import NoDataAvailable from '@/components/noDataAvailable/NoDataAvailable';
import SelectDateIcon from '@/assets/selectDateIcon';
import AddIcon from '@/assets/addIcon';
import { defaultAddtripBlob } from '@/assets/blobs/defaultAddtripBlob';
import { SUBSCRIPTION_DETAILS } from '@/utils/constants';

type AddTripSectionProps = {
  selectedPlace: string | undefined;
  selectedPlaceInCalendar: string | undefined;
  dayAndMonth: string;
  dateSelectedInCalendar: Date | undefined;
  tripsData: TripsDataProps[] | undefined;
  setSelectedPlace: (selectedPlace: string | undefined) => void;
  startDate: Date;
  work_from_home: string;
  work_from_office: string;
  add_trip: string;
  edit: string;
  delete_trip_confirmation_message: string;
  yes: string;
  no: string;
  no_data_available: string;
  select_date_from_calendar: string;
  carpoolText: string;
  passengerText: string;
  peopleText: string;
  driverText: string;
  intl: any;
};

type VehicleData = {
  name: string;
  icon: string;
  value: string;
  vehicle_class_id?: string;
  modality_id?: number;
};

type ValueAndIconProps = {
  name: string;
  icon: any;
  value: string;
};

export default function AddTripSection({
  selectedPlace,
  dayAndMonth,
  dateSelectedInCalendar,
  tripsData,
  startDate,
  work_from_home,
  work_from_office,
  add_trip,
  edit,
  delete_trip_confirmation_message,
  yes,
  no,
  no_data_available,
  select_date_from_calendar,
  selectedPlaceInCalendar,
  carpoolText,
  passengerText,
  intl,
  peopleText,
  driverText,
}: AddTripSectionProps) {
  const [licenseDataFromLocal, setLicensetDataFromLocal] = useState<any>();
  useEffect(() => {
    const getSubscriptionDataFromLocal = JSON.parse(localStorage.getItem(SUBSCRIPTION_DETAILS) || '{}');
    if (getSubscriptionDataFromLocal) {
      setLicensetDataFromLocal(getSubscriptionDataFromLocal);
    }
  }, []);
  const [modifiedVehicleClasses, setModifiedVehicleClasses] = useState<ValueAndIconProps[]>([]);
  const [modifiedVehicles, setModifiedVehicles] = useState<ValueAndIconProps[]>([]);
  const getVehicles = useAppSelector((state: RootState) => vehicles(state));
  const vehicleClass = useAppSelector((state: RootState) => vehicleClasses(state));
  const licenseDetails = useAppSelector((state: RootState) => selectLicenseConfigDetails(state));
  const subscriptionDetails = licenseDetails || licenseDataFromLocal?.license?.config;

  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      setShowTopGradient(scrollTop > 0);
      setShowBottomGradient(scrollTop + clientHeight < scrollHeight);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement?.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [tripsData]);

  useEffect(() => {
    if (vehicleClass) {
      const filteredVehicleClassData = filterPublicTransport(vehicleClass);
      const modifiedVehiclesData = filteredVehicleClassData.map((item: any) => ({
        name: item.name,
        icon: item.icon_url,
        value: item.id,
        modality_id: item.modality_id,
      }));
      setModifiedVehicleClasses(modifiedVehiclesData);
    }
  }, [vehicleClass]);

  useEffect(() => {
    if (getVehicles) {
      const modifiedVehicleData: VehicleData[] = getVehicles?.map((item: any) => ({
        name: item?.name,
        icon: item?.vehicle_class?.icon_url,
        value: item?.id,
        vehicle_class_id: item?.vehicle_class_id,
        modality_id: item.modality_id,
      }));
      setModifiedVehicles(modifiedVehicleData);
    }
  }, [getVehicles]);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleAddTripDialog = () => {
    if (!handleWeekendRestrictions(subscriptionDetails, dateSelectedInCalendar, true, selectedPlace)) {
      setDialogOpen(true);
    }
  };
  // const handlePlaceSelectInTripSection = (selectedPlace: string) => {
  //   setSelectedPlace(selectedPlace);
  // };

  return (
    <>
      {dateSelectedInCalendar && !selectedPlaceInCalendar ? (
        <AddTripContainer>
          <Box sx={{ display: 'flex', marginBottom: '16px', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                height: '35px',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
              }}>
              <DialogHeaderTypography>{dayAndMonth}</DialogHeaderTypography>
              <Box sx={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <DialogHeaderTypography>{add_trip}</DialogHeaderTypography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    height: '40px',
                    width: '40px',
                    // background: 'red',
                    position: 'relative',
                  }}
                  onClick={handleAddTripDialog}>
                  <Box
                    sx={{
                      height: '53px',
                      width: '52px',
                      position: 'absolute',
                      left: process.env.NEXT_PUBLIC_ADD_TRIP_BLOB_LEFT || '-1px',
                      top: process.env.NEXT_PUBLIC_ADD_TRIP_BLOB_TOP || '-3px',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: `url("data:image/svg+xml;base64,${process.env.NEXT_PUBLIC_ADD_TRIP_BLOB || defaultAddtripBlob}")`,
                    }}
                  />
                  {/* <Image src={addTripIcon} alt='add trip' /> */}
                  <Box
                    sx={{
                      zIndex: '1',
                    }}>
                    <AddIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
            <PlaceTypography>
              {selectedPlace === 'home' ? work_from_home : selectedPlace === 'office' ? work_from_office : ''}
            </PlaceTypography>
          </Box>
          {showTopGradient && (
            <Box
              sx={{
                display: 'block',
                position: 'absolute',
                top: 0,
                marginTop: '79px',
                width: `calc(100% - 58px)`,
                height: '70px',
                background: 'linear-gradient(360deg ,#FFFFFF 0%, #FFFFFF46 .23%, #F5F5F5 100%)',
                zIndex: 2,
              }}
            />
          )}
          <Box
            ref={scrollRef}
            sx={{
              // marginTop: '20px',
              display: 'flex',
              rowGap: '11px',
              flexDirection: 'column',
              overflowY: 'scroll',
              height: '86%',
              padding: '0px 0px 10px 0px',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                border: '4px solid #E1E1E1',
                borderRadius: '10px',
              },
            }}>
            {tripsData && tripsData.length === 0 ? (
              <NoDataAvailable label={no_data_available} />
            ) : (
              tripsData &&
              tripsData.map((item, index) => {
                return (
                  <AddTripRow
                    intl={intl}
                    edit={edit}
                    startDate={startDate}
                    key={item.id}
                    item={item}
                    delete_trip_confirmation_message={delete_trip_confirmation_message}
                    yes={yes}
                    no={no}
                    // handleChange={handleChange}
                    selectValue={[...modifiedVehicles, ...modifiedVehicleClasses]}
                    isLastElement={tripsData.length - 1}
                    index={index}
                    carpoolText={carpoolText}
                    passengerText={passengerText}
                    peopleText={peopleText}
                    driverText={driverText}
                  />
                );
              })
            )}
          </Box>
          {showBottomGradient && (
            <Box
              sx={{
                display: 'block',
                position: 'absolute',
                bottom: 0,
                width: `calc(100% - 58px)`,
                height: '100px',
                background: 'linear-gradient(180deg ,#FFFFFF 0%, #FFFFFF46 .23%, #F5F5F5 100%)',
                zIndex: 1,
              }}
            />
          )}
          <AddTripDialog
            selectValue={[...modifiedVehicles, ...modifiedVehicleClasses]}
            dateSelectedInCalendar={dateSelectedInCalendar}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
          />
        </AddTripContainer>
      ) : (
        <SelectDateWrapper>
          {/* <Box sx={{ maxWidth: '240px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography textAlign='center' color={defaultStyle.primaryColor} variant='selectDatelabel'>
              {select_date_from_calendar}
            </Typography>
            <SelectDateIcon fill={defaultStyle.primaryColor} />
          </Box>
        </SelectDateWrapper>
      )}
    </>
  );
}
const PlaceTypography = styled(Typography)(() => ({
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: '20px',
  color: defaultStyle.primaryColor,
}));
export const SelectDateWrapper = styled(Box)(({ theme }: any) => ({
  maxWidth: '485px',
  width: '100%',
  // maxHeight: '198px',
  height: '480px',
  padding: ' 24px 27px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: defaultStyle.secondaryColor,
  boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.09)  !important',
  borderRadius: '15px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '545px',
    width: '100%',
  },
}));
