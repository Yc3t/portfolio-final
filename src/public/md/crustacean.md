## How to add more debug things

```bash
if cfg!(debug_assertions){
	assert!
}
```

## How to create a macro

```c
macro_rules! print {

    ($($arg:tt)*) => {{ // MATCH ZERO OR MORE TT, AND BIND EACH ONE TO THE VARIABLE ARG

        $crate::io::_print($crate::format_args!($($arg)*));

    }};

}
```


`$` -> CAPTURE THE NEXT THING
`:` -> Tells the macro designator what to expect (eg. EXPECT A TOKEN TREE(tt))

`*` -> Tells the macro to expect zero or more repetitions
=>  -> Separate the macro pattern from the body

$crate -> variable that refers to the current crate

`::` -> Access items in a module (io module in this example)


## More crazy things

Ok (T)
you cannot modify an iterator while iterating over it

{:02} -> will be padded if its only 1 number: 1 -> 01

to compare for example an i32 to an u32 you need to do i32 < (u16 as i32)

```java
use std::convert::TryInto;

  

fn main(){

    let a:i32 = 10;

    let b: u16= 100;


    let c = b.try_into().unwrap(); //gets the number if its possible,thats what unwrap does

  
    if a<c{

        println!("haha")

    }
```

lol
![[Crustacean in action-20240302012212178.png]]

if else rebunked?

![[AI-TOWN.png|20]]

& -> reference operator
"asterisk" -> Derefernce operator

