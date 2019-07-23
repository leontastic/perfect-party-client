import { stubFalse, stubTrue, toNumber } from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Divider,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddOutlined'
import CheckIcon from '@material-ui/icons/CheckOutlined'
import { pushStateActionCreator, submitFormActionCreator, createSetFormField } from '../store/actions'
import {
  createFormFieldsSelector,
  createRouteStartsWithSelector,
  getCurrentEvent,
  getHosts,
  getVenues,
  getCurrentEventVenueInvoicePrice,
  getUpdatedEventVenuePrice,
  getCurrentEventVenueId,
  getNewEventVenuePrice,
} from '../store/selectors'
import Form from '../components/Form'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  leftIcon: {
    marginRight: theme.spacing(1),
  },
}))

const EventFormDialog = ({
  editing,
  open,
  fields,
  hosts,
  venues,
  currentEventVenueId,
  updatedEventVenuePrice,
  currentEventVenueInvoicePrice,
  onCancel,
  onSubmit,
  onChange,
}) => {
  const classes = useStyles()
  const handleFieldChanged = ({ target: { value, name } }) => onChange(value, name)
  return (
    <Dialog open={open} onClose={() => onCancel()} maxWidth='xs' fullWidth scroll='body'>
      <Form onSubmit={() => onSubmit(fields)}>
        <DialogTitle>
          <Box my={1}>
            <Typography variant='h4'>{editing ? 'Update Event' : 'Add Event'}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                select
                variant='outlined'
                label='Host'
                name='hostid'
                value={fields['hostid'] || ''}
                fullWidth
                autoFocus
              >
                {hosts.map(({ hostid, firstname, lastname, email, phonenumber }) => (
                  <MenuItem key={hostid} value={hostid}>
                    <Box p={1}>
                      {`${firstname} ${lastname}`}
                      <Typography variant='caption' color='textSecondary' component='div'>
                        {phonenumber} | {email}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Event Name'
                name='eventname'
                value={fields['eventname'] || ''}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Event Date'
                name='eventdate'
                value={fields['eventdate'] || ''}
                type='date'
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleFieldChanged}
                required
                variant='outlined'
                label='Venue'
                name='venueid'
                value={fields['venueid'] || ''}
                select
                fullWidth
              >
                {venues.map(({ venueid, name, address, price }) => (
                  <MenuItem key={venueid} value={venueid}>
                    <Box p={1}>
                      {name} (${toNumber(price)})
                      <Typography variant='caption' color='textSecondary' component='div'>
                        {address}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {
              <>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  {editing ? (
                    <TextField
                      variant='standard'
                      label='Original Venue Price'
                      value={currentEventVenueInvoicePrice || ''}
                      InputProps={{ readOnly: true }}
                      fullWidth
                    />
                  ) : null}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant='standard'
                    label='Venue Price'
                    value={
                      (currentEventVenueId === fields.venueid
                        ? currentEventVenueInvoicePrice
                        : updatedEventVenuePrice) || ''
                    }
                    InputProps={{ readOnly: true }}
                    helperText='The venue price upon booking is the final price, it will not be adjusted.'
                    fullWidth
                  />
                </Grid>
              </>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box display='flex' p={2} flex={1} justifyContent='space-between'>
            <Button variant='outlined' onClick={() => onCancel()} color='secondary'>
              Cancel
            </Button>
            <Button variant='contained' type='submit' color='primary'>
              {editing ? <CheckIcon className={classes.leftIcon} /> : <AddIcon className={classes.leftIcon} />}
              {editing ? 'Update Event' : 'Add Event'}
            </Button>
          </Box>
        </DialogActions>
      </Form>
    </Dialog>
  )
}

export const AddEventForm = connect(
  createStructuredSelector({
    hosts: getHosts,
    venues: getVenues,
    open: createRouteStartsWithSelector('/events/new'),
    fields: createFormFieldsSelector('addEvent'),
    currentEventVenueId: () => undefined,
    currentEventVenueInvoicePrice: getNewEventVenuePrice,
    updatedEventVenuePrice: getNewEventVenuePrice,
    editing: stubFalse,
  }),
  {
    onChange: createSetFormField('addEvent'),
    onSubmit: submitFormActionCreator('events', 'eventid', 'POST'),
    onCancel: pushStateActionCreator('events'),
  },
)(EventFormDialog)

export const EditEventForm = connect(
  createStructuredSelector({
    hosts: getHosts,
    venues: getVenues,
    open: createRouteStartsWithSelector('/events/edit'),
    fields: createSelector(
      createFormFieldsSelector('editEvent'),
      getCurrentEvent,
      (fields, { venueaddress, venuename, venueprice, ...event } = {}) => ({ ...event, ...fields }),
    ),
    currentEventVenueId: getCurrentEventVenueId,
    currentEventVenueInvoicePrice: getCurrentEventVenueInvoicePrice,
    updatedEventVenuePrice: getUpdatedEventVenuePrice,
    editing: stubTrue,
  }),
  {
    onChange: createSetFormField('editEvent'),
    onSubmit: submitFormActionCreator('events', 'eventid', 'PUT'),
    onCancel: pushStateActionCreator('events'),
  },
)(EventFormDialog)
