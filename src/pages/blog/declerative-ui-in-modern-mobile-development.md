---
layout: ../../layouts/BlogPost.astro
title: 'Declerative UI in modern mobile development'
description: "React Native and Flutter embraces the declarative UI model, which I have enjoyed working with. If you are new to this model, you can easily feel overwhelmed, but after some practice, you will master it and feel comfortable thinking about that model."
publishDate: '2020-12-31'
tags: ["Mobile", "React Native", "SwiftUI", "Kotlin", "Cross Platfrom", "Declarative"]
---

Over the last 8 years, I've been developing apps using native development tools as well as cross-platform tools like Appcelerator, Titanium, Cordova, Flutter, and React Native. 

I always preferred the cross-platform tools as I see some value in multi-targeting from the same code base as well as the ease of development.

For example in React Native I can check the changes in the app when running on the simulator/emulator or the device in less than a second, this is crucial to me, as it allows me to be super fast and more productive, another key benefit is the ability to check the same UI on multiple device form factors and make sure the UI looks good on all devices.

### Declerative UI

Recently, I was involved in an Android project built with Java/Kotlin, and I fell in love with Kotlin at first sight. Coming from Typescript, to me, Kotlin felt like Typescript but on steroids, it is super productive as it allows you to write the same Java code in fewer lines without sacrificing readability.

React Native and Flutter embraces the declarative UI model, which I have enjoyed working with. If you are new to this model, you can easily feel overwhelmed, but after some practice, you will master it and feel comfortable thinking about that model.

SwiftUI and Jetpack compose follow the same model now, and I couldn't be happier about that. I use Jetpack compose in an Android app, and SwiftUI to develop a native macOS app, and from the first try, I was able to be productive and feel at home.

### Example code

To give you some idea of what I'm talking about, here is a counter app written using different languages:

```kotlin
// Jetpack Compose
@Composable
fun CounterApp() {
	  // 1. state initialization with 0 as default value
    var (count, setCount) = remember { mutableStateOf(0) }
  	// 2. render main layout container
    Column { 
        Text("Count = $count") // 3. bind count value to the text component
        
        Button({ setCount(count + 1)}) { // 4. increment count
            Text("Increment");
        }

        Button({ setCount(count - 1) }) { // 5. decrement count
            Text("Decrement");
        }
    }
}
```


```jsx
// React
function CounterApp() {
  // 1. state initialization with 0 as default value
  const [count, setCount] = useState(0)
  return (
    // 2. render main layout container
    <div className="App">
      <h1>Count = {count}</h1> { /* 3. bind count value to the text component*/ }
      <button onClick={() => setCount(count+1)}>Increment</button> {/* 4. increment count */ }
      <button onClick={() => setCount(count-1)}>Decrement</button> {/* 5. decrement count */ }
    </div>
  );
}
```


```swift
// SwiftUI
struct CounterApp: View {
	  // 1. state initialization with 0 as default value
    @State var counter = 0;
    var body: some View {
            VStack { // 2. render main layout container
                Text("Count \(counter)") // 3. bind count value to the text component
                
              	// 4. increment count
                Button(action: { counter += 1 }, label: {
                    Text("Increment")
                })
                
	              // 5. decrement count
                Button(action: { counter -= 1 }, label: {
                    Text("-")
                })
            }
    }
}
```


```dart
// Flutter
class CounterApp extends StatefulWidget {
  @override
  _CounterAppState createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  // 1. state initialization with 0 as default value
  int count = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(children: [ // 2. render main layout container
      Text("Count = $count"), // 3. bind count value to the text component
      RaisedButton(
          onPressed: () {
            // 4. increment count
            setState(() {
              count += 1;
            });
          },
          child: Text("Increment")),
      RaisedButton(
	        // 5. decrement count
          onPressed: () {
            setState(() {
              count -= 1;
            });
          },
          child: Text("Decrement"))
    ]);
  }
}
```

### UI = fn(state)

If you look closely at the declarative UI model, you can imagine it as a function that takes the current state and return the UI. All the changes in the UI are driven by the current state. 
If you want to change the UI, you simply change the state and the framework will handle applying the new changes to the UI.

Once you mastered this part, everything will make sense to you.