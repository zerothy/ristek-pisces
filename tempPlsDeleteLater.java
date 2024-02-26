class Car {
    private String brand;
    private String type;
    private String platNo;
    private String warna;
    private int noOfDoors;
    private double maxSpeed;

    public Car(){
    }

    public Car(String brand, String type, String platNo, String warna, int noOfDoors, double maxSpeed){
        this.brand      = brand;
        this.type       = type;
        this.platNo     = platNo;
        this.warna      = warna;
        this.noOfDoors  = noOfDoors;
        this.maxSpeed   = maxSpeed;
    }

    public String toString(){
        return String.format("%s %s %s %s %d %f", this.brand, this.type, this.platNo, this.warna, this.noOfDoors, this.maxSpeed);
    }
}

class ParkingLot {
    private Car[] listOfCars;
    private int capacity;
    private int noOfParkedCars;

    public ParkingLot(){
    }

    public ParkingLot(int capacity){
        this.capacity = capacity;
        this.listOfCars = new Car[this.capacity];
    }

    public void numParkACar(Car newCar){
        listOfCars[noOfParkedCars] = newCar;
        System.out.println(String.format("%s Has just parked", newCar.toString()));
    }

    public String toString(){
        return String.format("This parking lot has %d cars", this.noOfParkedCars);
    }
}

public class tempPlsDeleteLater {
    public static void main(String[] args) {
        Car car1 = new Car("Toyota", "Sedan", "ABC123", "Red", 4, 200.0);
        Car car2 = new Car("Honda", "SUV", "XYZ789", "Blue", 5, 180.0);

        ParkingLot parkingLot = new ParkingLot(10);
        parkingLot.numParkACar(car1);
        parkingLot.numParkACar(car2);

        System.out.println(parkingLot.toString());
    }
}
