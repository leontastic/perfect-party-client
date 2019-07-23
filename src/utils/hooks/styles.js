import { makeStyles } from '@material-ui/core'

export const useWideListItemAvatarStyles = makeStyles(theme => ({
  root: {
    minWidth: theme.spacing(12),
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

export const useListItemStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  secondaryAction: {
    paddingRight: theme.spacing(16),
  },
}))
