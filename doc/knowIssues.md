
# Errores conocidos

## Error forwardRef

### Error

```
Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?"
```
### Solución 

```js
  // Ejemplo de aplicación en header.js:

  const NotiicationItem = forwardRef((props, ref) => {
    const { notification } = props

    if (notification) {
      return (
        <Link
          ref={ref}
          key={notification.id}
          className={classes.link}
          to={{ pathname: '/app/notifications', search: `?${window.btoa(`n=${notification.id}`)}` }}
        >
          <MenuItem
            ref={ref}
            onClick={() => setNotificationsMenu(null)}
            className={classes.headerMenuItem}
          >
            <NotificationsHeader {...notification} typographyVariant='inherit' />
          </MenuItem>
        </Link>
      )
    } else {
      return (
        <></>
      )
    }
  })

  // more info: https://github.com/atomiks/tippyjs-react#component-children
  // more info: https://github.com/atomiks/tippyjs-react/issues/49
```