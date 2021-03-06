/** @jsx jsx */
import React from 'react';
import { FormGroup, FormControlLabel, RadioGroup, Radio, TextField, Typography, CircularProgress } from '@material-ui/core';
import { LocationOn } from '@material-ui/icons'
import { jsx } from '@emotion/core'
import { Box } from '../Box';
import { StyledButton } from '../StyledButton';
import { PlacesAutocomplete } from './Autocomplete';

const styles = {
  container: {
    height: '100%',
  },
  containerInner: {
    display: 'flex',
  },
  details: {
    flex: '0 0 50%',
    marginBottom: 0,
  },
  subtitle: {
    marginBottom: '23px !important',
  },
  location: {
    display: 'flex',
    flex: '1 1 40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    background: '#FFFFFF',
    boxShadow: '0px 0px 18px rgba(0, 0, 0, 0.16)',
    borderRadius: 3,
    width: '80%',
    padding: '40px 0 60px 0',
  },
  icon: {
    borderRadius: '50%',
    background: '#F7685B',
    width: 40,
    height: 40,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    padding: '50px 90px'
  },
  input: {
    flexGrow: 1,
  },
  row: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center',
  },
  label: {
    width: 110,
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row !important',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 60,
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
  },
  detailsTitle: {
    marginBottom: '25px !important',
  },
  recommendedLocation: {
    marginBottom: '25px !important',
  }
};

export const Recommendation = ({ recommendation, loading, getRecommendation }) => {
  const [severity, setSeverity] = React.useState('1');
  return (
    <div css={styles.container}>
      <Typography variant='h5' css={styles.title}>
        הפניית חולים חיוביים
      </Typography>
      <Typography css={styles.subtitle}>
        הזינו את פרטי המטופל על מנת לקבל המלצה למקום אישפוזו
      </Typography>
      <div css={styles.containerInner}>
        <Box title="פרטי המטופל" css={styles.details}>
          <div css={styles.formContainer}>
            <FormGroup row css={styles.row}>
              <Typography css={styles.label}>
               תעודת זהות
              </Typography>
              <TextField
                variant='outlined'
                size='small'
                css={styles.input}
              />
            </FormGroup>
            <FormGroup row css={styles.row}>
              <Typography css={styles.label}>
             כתובת
              </Typography>
              <PlacesAutocomplete onSelect={(e) => console.log(e)}/>
            </FormGroup>
            <FormGroup row css={styles.row}>
              <Typography css={styles.label}>
              קבוצת סיכון
              </Typography>
              <RadioGroup
                aria-label="patient-state"
                name="patient-state"
                value={"yes"}
                onChange={() => {}}
                css={styles.radioGroup}
              >
                <FormControlLabel value="yes" control={<Radio color='primary' />} label="כן" />
                <FormControlLabel value="no" control={<Radio color='primary' />} label="לא" />
              </RadioGroup>
            </FormGroup>
            <FormGroup row css={styles.row}>
              <Typography css={styles.label}>
              חומרת מצב
              </Typography>
              <RadioGroup
                aria-label="patient-state"
                name="patient-state"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                css={styles.radioGroup}
              >
                <FormControlLabel value="1" control={<Radio color='primary'/>} label="קל" />
                <FormControlLabel value="2" control={<Radio color='primary'/>} label="בינוני" />
                <FormControlLabel value="3" control={<Radio color='primary' />} label="קשה" />
              </RadioGroup>
            </FormGroup>

            <div css={styles.buttonContainer}>
              <StyledButton css={styles.button} onClick={getRecommendation}>
                קבלת המלצה
              </StyledButton>
            </div>
          </div>
        </Box>
        {(recommendation || loading) && <div css={styles.location}>
          {
            loading ? <CircularProgress/> : (
              <div css={styles.locationBox}>
                <div css={styles.icon}>
                  <LocationOn htmlColor='#fff' />
                </div>
                <Typography variant='h5' css={styles.detailsTitle}>המלצת אשפוז</Typography>
                {
                  recommendation.map((rec, i) => (
                    <div css={styles.recommendedLocation}>
                      <Typography variant='h4' color='primary'>
                        {i + 1}. {rec.name}
                      </Typography>
                      <Typography variant='h6'>
                        {rec.address}
                      </Typography>
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>}
      </div>
    </div>
  )
};
