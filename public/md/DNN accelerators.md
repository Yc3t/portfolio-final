To createa a DNN acelerator first we need to talk about domain specific acelerators. It is specialized hardware
GP (General-purpose) computing is so inneficient,like CPU
![[DNN accelerators-20240307183047838.png|400]]


SIMD CAN 100X performance over native python
How can we setup SoC to achieve critical perfomance?
- Tensorflow is a DSL (domain specific language) with it, we can use flow control for DNNs

High degree of parallelism provide gains in performance

The bottleneck is the memory.
![[DNN accelerators-20240307180425470.png|400]]


Most of the energy in processors is spent in the overhead(extra resources spent,like power,time,in order to complete a specific task, its what's beyond what is directly needed for the task)

# How fpga works

Fpga is all about logic blocks. It is designed to be modified,unlike CPUs
![[DNN accelerators-20240307181641673.png|500]]

## Components of an FPGA
- LUTS -> table to do an operation
- bram
- **DSP**
- Interconnect and routing
- **SRAM** implementation is popular too

Example: Xilinx 7 -> EACH logic block has 2 slices
A slice is this (previously called BLE)
![[DNN accelerators-20240307182159483.png|500]]


