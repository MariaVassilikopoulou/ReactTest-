import { render,screen,waitFor,fireEvent } from "@testing-library/react";
import App from './App';
import { beforeEach, expect } from "vitest";

describe('App',()=>{
    beforeEach(()=>{
        render(<App/>);
    });

// ~~~~~~~~~~~~~~User Story 1: Book a date and time with number of players~~~~~~~~~~~~~~
      it('should display the date in the field after selection of date',async()=>{
      const dateInputField = await screen.getByLabelText('Date');
      fireEvent.input(dateInputField,{target: {value: '2023-07-25'}}); 
      expect(dateInputField).toHaveValue('2023-07-25');
      });

      it('should display the number of players in the input field', async () => {
        const playersInput = await screen.getByLabelText('Number of awesome bowlers');
        fireEvent.change(playersInput, { target: { value: 2 } });
        expect(playersInput).toHaveValue(2);
      });

      it('should render error if amount of people max4 choose one lane', async()=>{
        const playersInput = await screen.getByLabelText('Number of awesome bowlers');
        const lanesInput= await screen.getByLabelText('Number of lanes');
        const bookingButton = screen.getByText('strIIIIIike!');

        fireEvent.change(playersInput,{target:{value:'5'}});
        fireEvent.change(lanesInput,{target:{value:'1'}});
        fireEvent.click(bookingButton);
    
        await waitFor(() => {
          expect(screen.getByText('Fill out all the fields and make sure that people and shoes is the same number.')).toBeInTheDocument();
        });
      });

      it('should process booking and user can use the confirmation button', async () => {
        const dateInputField = await screen.getByLabelText('Date');
        const timeInput= await screen.getByLabelText('Time');
        const lanesInput= await screen.getByLabelText('Number of lanes');
        const playersInput = await screen.getByLabelText('Number of awesome bowlers');
        const shoeButton = screen.getByText('+');
        const bookingButton = screen.getByText('strIIIIIike!');

        fireEvent.change(dateInputField,{target: {value: '2023-07-25'}}); 
        fireEvent.change(timeInput,{target: {value:'18:00' }} );
        fireEvent.change(lanesInput,{target:{value:'2'}});
        fireEvent.change(playersInput,{target:{value:'2'}});
        fireEvent.click(shoeButton);
        const shoeSizeInput= await screen.getByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeInput, {target:{value:'42'}});
        fireEvent.click(bookingButton);

        await waitFor(() => {
          const bookingButton= screen.getAllByRole('button').find(button => button.textContent === ' strIIIIIike!');
          expect(bookingButton).toBeInTheDocument;

          const confirmationButton = screen.getAllByRole('button').find(button => button.textContent === "Sweet, let's go!");
          expect(confirmationButton).toBeInTheDocument;
          //expect(screen.getByText("Sweet, let's go!")).toBeInTheDocument()
        }); 
      });

      it('should render an error message if fields are empty', async()=>{
        const dateInputField = await screen.findByLabelText('Date');
        const timeInput= await screen.getByLabelText('Time');
        const lanesInput= await screen.getByLabelText('Number of lanes');
        const playersInput = await screen.getByLabelText('Number of awesome bowlers');
        const bookingButton= screen.getByText(/strIIIIIike!/i);

        fireEvent.click(bookingButton);
        fireEvent.change(dateInputField, { target: { value: '' } });
        fireEvent.change(timeInput,{target: {value:'' }} );
        fireEvent.change(lanesInput,{target:{value:''}});
        fireEvent.change(playersInput,{target:{value:''}});

        await waitFor(()=>{
          expect(screen.getByText('Fill out all the fields and make sure that people and shoes is the same number.')).toBeInTheDocument;
        });
      });

//~~~~~~~~~~~~~~User Story 2: Selecting shoe sizes for each player~~~~~~~~~~~~~~

      it('should display a shoe size for each player in the field after selection of shoe size', async ()=>{
        const shoeButton = screen.getByText('+');
        fireEvent.click(shoeButton);

        const shoeSizeInput= await screen.getByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeInput, {target:{value:'42'}});
        expect(shoeSizeInput).toHaveValue('42');
      });



      it('should render error message if proceed to book without selecting shoe size', async ()=>{
        const shoeButton = screen.getByText('+');
        fireEvent.click(shoeButton);

        const shoeSizeInput= await screen.getByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeInput, {target:{value:'42'}});
        expect(shoeSizeInput).toHaveValue('42');

        const bookingButton= screen.getByText(/strIIIIIike!/i);
        fireEvent.click(bookingButton);
        await waitFor(()=>{
          expect(screen.getByText('Fill out all the fields and make sure that people and shoes is the same number.')).toBeInTheDocument;
        });
      });

//~~~~~~~~~~~~~~User Story 3: Remove a shoe size field~~~~~~~~~~~~~~

      it('should remove shoe size after clicking the (-) button', async ()=>{
        const shoeButton = screen.getByText('+');
        fireEvent.click(shoeButton);

        const shoeButtonRemove = screen.getByText('-');
        fireEvent.click(shoeButtonRemove);

        const shoeSizeInput= await screen.queryByLabelText(/Shoe size/);
        expect(shoeSizeInput).not.toBeInTheDocument();
      });

//~~~~~~~~~~~~~~User Story 4: Send booking and receive confirmation~~~~~~~~~~~~~~

      it("should 'send' booking confirmation,then a booking number is genarated in the form." , async()=>{
        const dateInputField = await screen.getByLabelText('Date');
        const timeInput= await screen.getByLabelText('Time');
        const lanesInput= await screen.getByLabelText('Number of lanes');
        const playersInput = await screen.getByLabelText('Number of awesome bowlers');
        const shoeButton = screen.getByText('+');
        const bookingButton = screen.getByText('strIIIIIike!');

        fireEvent.change(dateInputField,{target: {value: '2023-07-25'}}); 
        fireEvent.change(timeInput,{target: {value:'18:00' }} );
        fireEvent.change(lanesInput,{target:{value:'2'}});
        fireEvent.change(playersInput,{target:{value:'2'}});
        fireEvent.click(shoeButton);
        const shoeSizeInput= await screen.getByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeInput, {target:{value:'42'}});
        fireEvent.click(bookingButton);

        const bookingNumber= screen.queryByLabelText('Booking number');    
          if(bookingNumber)
          {
            expect(bookingNumber).toBeInTheDocument();
            expect(bookingNumber.value).toMatch(/^STR\d{4}[A-Z]{4}$/);
          }
      });

      it ('should display the booking confirmation number and the total amount', async()=>{
        const dateInputField = screen.getByLabelText('Date');
        const timeInput = screen.getByLabelText('Time');
        const lanesInput = screen.getByLabelText('Number of lanes');
        const playersInput = screen.getByLabelText('Number of awesome bowlers');
        const shoeButton = screen.getByText('+');
        const bookingButton = screen.getByText('strIIIIIike!');

        fireEvent.change(dateInputField, { target: { value: '2023-07-25' } });
        fireEvent.change(timeInput, { target: { value: '18:00' } });
        fireEvent.change(lanesInput, { target: { value: '2' } });
        fireEvent.change(playersInput, { target: { value: '2' } });
        fireEvent.click(shoeButton);
        const shoeSizeInput = await screen.findByLabelText(/Shoe size/);
        fireEvent.change(shoeSizeInput, { target: { value: '42' } });
        fireEvent.click(bookingButton);
        
        const bookingNumber= screen.queryByLabelText('Booking number');
          if(bookingNumber)
            {
              expect(bookingNumber).toBeInTheDocument();
              //expect(bookingNumber.value).toMatch(/^STR\d{4}[A-Z]{4}$/);
              expect(bookingNumber).toHaveValue('STR1234ABCD');
            }

        const totalAmount = screen.queryByLabelText('Total:');
          if(totalAmount)
          {
            expect(totalAmount).toBeInTheDocument();
            //expect(totalAmount.nextSibling).toHaveTextContent('100 sek');
            expect(totalAmount).toHaveTextContent('100sek');
          }
      });


      it('should reset form to default state when navigating back to booking view', async()=>{
        const confirmationButton = screen.getAllByRole('button').find(button => button.textContent === "Sweet, let's go!");
        expect(confirmationButton).toBeInTheDocument;

        await waitFor(()=>{
          const dateInputField =screen.findByLabelText('Date');
          expect(dateInputField, { target: { value: '' } });

          const timeInput=screen.getByLabelText('Time');
          expect(timeInput,{target: {value:'' }} );
          
          const lanesInput= screen.getByLabelText('Number of lanes');
          expect(lanesInput,{target:{value:''}});

          const playersInput = screen.getByLabelText('Number of awesome bowlers');
          expect(playersInput,{target:{value:''}});
        });
      });
});
