export function windowLocationMock(locationObject: { [key: string]: any }): void {
  global.window = Object.create(window);
  global.window.location = locationObject as string & Location;
}
