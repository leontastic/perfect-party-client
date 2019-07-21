import { makeStyles } from '@material-ui/core'

export const useWideListItemAvatarStyles = makeStyles(theme => ({
  root: {
    minWidth: theme.spacing(12),
  },
}))

export const useListItemStyles = makeStyles(theme => ({
  secondaryAction: {
    paddingRight: theme.spacing(16),
  },
}))
