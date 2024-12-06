const translations = {
    en: {
        title: "Massage Chair Reservation",
        myReservations: "My Reservations",
        selectDate: "Select Date:",
        selectLocation: "Select Location:",
        selectTimeSlot: "Select Available Time Slot:",
        selectChair: "Select Chair:",
        employeeId: "Employee ID:",
        employeeIdPlaceholder: "Enter your employee ID",
        indicatorName: "Indicator & Name:",
        indicatorNamePlaceholder: "Enter your indicator followed by your full name",
        submitButton: "Submit Reservation",
        checkReservation: "Check Reservation",
        noReservation: "No current reservations found for this ID.",
        selectDateHelper: "Select today or tomorrow only",
        employeeIdHelper: "Enter your employee ID",
        indicatorNameHelper: "Enter your indicator followed by your full name",
        selectLocationDefault: "-- Select Location --",
        selectTimeDefault: '-- First Select Location --',
        selectTimeAfterLocation: '-- Select Time Slot --',
        //chairAvailable: "chair available",
        chairAvailability: (count) => `${count} chair${count > 1 ? 's' : ''} available`,
        chair: (number) => `Chair ${number}`,
        reservationSuccessful: "Reservation Successful!",
        reservationDetails: "Reservation Details",
        modalDate: "Date:",
        modalLocation: "Location:",
        modalTimeSlot: "Time Slot:",
        modalChair: "Chair:",
        modalEmployeeId: "Employee ID:",
        modalName: "Name:",
        captureScreenshot: "Capture Screenshot",
        currentReservation: "Current Reservation",
        cancelReservation: "Cancel Reservation",
        modalTime: "Time:",
        toastMessages: {
            reservationSuccess: "Reservation successful!",
            fillAllFields: "Please fill in all fields",
            alreadyReserved: "You have already made a reservation this month. Only one reservation per month is allowed.",
            chairReserved: "Sorry, this chair has already been reserved for the selected time slot. Please choose another chair or time slot.",
            enterEmployeeId: "Please enter your employee ID",
            reservationCancelled: "Reservation cancelled successfully",
            screenshotSuccess: "Screenshot captured successfully",
            screenshotFailed: "Screenshot capture failed",
            noReservationFound: "No reservation found for this ID"
        },
        confirmCancellation: "Are you sure you want to cancel this reservation?"
    },

    th: {
        title: "จองเก้าอี้นวด",
        myReservations: "การจองของฉัน",
        selectDate: "เลือกวันที่:",
        selectLocation: "เลือกสถานที่:",
        selectTimeSlot: "เลือกเวลา:",
        selectChair: "เลือกเก้าอี้:",
        employeeId: "รหัสพนักงาน:",
        employeeIdPlaceholder: "กรอกรหัสพนักงานของคุณ",
        indicatorName: "รหัสแผนกและชื่อ:",
        indicatorNamePlaceholder: "กรอกชื่อแผนกตามด้วยชื่อเต็มของคุณ",
        submitButton: "ยืนยันการจอง",
        checkReservation: "ตรวจสอบการจอง",
        noReservation: "ไม่พบการจองสำหรับรหัสพนักงานนี้",
        selectDateHelper: "เลือกได้เฉพาะวันนี้หรือพรุ่งนี้เท่านั้น",
        employeeIdHelper: "กรอกรหัสพนักงาน",
        indicatorNameHelper: "กรอกชื่อแผนกตามด้วยชื่อเต็มของคุณ",
                // Dropdown options
        selectLocationDefault: "-- เลือกสถานที่ --",
        selectTimeDefault: '-- กรุณาเลือกสถานที่ก่อน --',
        selectTimeAfterLocation: '-- กรุณาเลือกเวลา --',
        //chairAvailable: "เก้าอี้ว่าง",
        chairAvailability: (count) => `เหลือเก้าอี้ ${count} ตัว`,
        chair: (number) => `เก้าอี้ ${number}`,
        reservationSuccessful: "จองสำเร็จ!",
        reservationDetails: "รายละเอียดการจอง",
        modalDate: "วันที่:",
        modalLocation: "สถานที่:",
        modalTimeSlot: "เวลา:",
        modalChair: "เก้าอี้:",
        modalEmployeeId: "รหัสพนักงาน:",
        modalName: "ชื่อ:",
        captureScreenshot: "บันทึกภาพหน้าจอ",
        currentReservation: "การจองปัจจุบัน",
        cancelReservation: "ยกเลิกการจอง",
        modalTime: "เวลา:",
        toastMessages: {
            reservationSuccess: "จองสำเร็จ!",
            fillAllFields: "กรุณากรอกข้อมูลให้ครบถ้วน",
            alreadyReserved: "คุณได้ทำการจองในเดือนนี้แล้ว อนุญาตให้จองได้เพียงครั้งเดียวต่อเดือนเท่านั้น",
            chairReserved: "ขออภัย เก้าอี้นี้ถูกจองแล้วสำหรับช่วงเวลาที่เลือก กรุณาเลือกเก้าอี้อื่นหรือช่วงเวลาอื่น",
            enterEmployeeId: "กรุณากรอกรหัสพนักงาน",
            reservationCancelled: "ยกเลิกการจองสำเร็จ",
            screenshotSuccess: "บันทึกภาพหน้าจอสำเร็จ",
            screenshotFailed: "บันทึกภาพหน้าจอไม่สำเร็จ",
            noReservationFound: "ไม่พบการจองสำหรับรหัสพนักงานนี้"
        },
        confirmCancellation: "คุณแน่ใจหรือไม่ที่จะยกเลิกการจองนี้?"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const dateInput = document.getElementById('date');
    const locationSelect = document.getElementById('location');
    const timeSlotSelect = document.getElementById('timeSlot');
    const chairSelection = document.getElementById('chairSelection');
    const submitButton = document.getElementById('submitReservation');
    const modal = document.getElementById('reservationModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const captureButton = document.getElementById('captureButton');

    // Initialize date picker
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = tomorrow.toISOString().split('T')[0];
    dateInput.value = today.toISOString().split('T')[0];

    // Location and chair mapping
    const locationChairs = {
        'MCB1': 1,
        'Satelite': 1,
        'MCB2': 1,
        'MCB_TPX': 1,
        'TPX_Admin': 1,
        'MCB_TLB': 1,
        'TLB_Admin': 2,
        'EBC': 3,
        'LAB': 1,
        'CFP': 1,
        'TSB': 3,
        'ENCO': 3
    };

    // Reservation storage functions
    async function saveReservation(reservation) {
        try {
            const response = await fetch(`/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservation)
            });
            if (!response.ok) {
                throw new Error('Reservation failed');
            }
            return response.json();
        } catch (error) {
            console.error('Error saving reservation:', error);
            throw error;
        }
    }

    async function getReservations() {
        try {
            const response = await fetch(`/api/reservations`);
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }
            return response.json();
        } catch (error) {
            console.error('Error getting reservations:', error);
            return [];
        }
    }

    async function canUserReserve(userId) {
        try {
            const response = await fetch(`/api/user-reservations/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to check user reservations');
            }
            const reservations = await response.json();
            return reservations.length === 0;
        } catch (error) {
            console.error('Error checking user reservation status:', error);
            return false;
        }
    }

    // Update the displayReservationDetails function
    function displayReservationDetails(reservation) {
        const detailsContainer = document.getElementById('reservationDetails');
        
        if (reservation) {
            detailsContainer.innerHTML = `
                <div class="reservation-card">
                    <h3>${translations[currentLang].currentReservation}</h3>
                    <div class="reservation-info">
                        <div class="info-row">
                            <span class="info-label">${translations[currentLang].modalDate}</span>
                            <span class="info-value">${reservation.date}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">${translations[currentLang].modalLocation}</span>
                            <span class="info-value">${reservation.location}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">${translations[currentLang].modalTime}</span>
                            <span class="info-value">${reservation.timeSlot}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">${translations[currentLang].modalChair}</span>
                            <span class="info-value">${currentLang === 'th' ? reservation.chair.replace('Chair', 'เก้าอี้') : reservation.chair}</span>
                        </div>
                    </div>
                    <button class="cancel-button" onclick="handleCancellation('${reservation.userId}')">
                        ${translations[currentLang].cancelReservation}
                    </button>
                </div>
            `;
        } else {
            // Clear the container instead of showing "no reservation" message
            detailsContainer.innerHTML = '';
        }
    }
    

    async function findUserReservation(userId) {
        try {
	    const response = await fetch(`/api/user-reservations/${userId}`);
	    const reservations = await response.json();
            return reservations[0]; // Return the first reservation if any
        } catch (error) {
	    console.error('Error finding user reservation:', error);
	    return null;
        }
        }
    
    async function cancelReservation(id) {
        try {
            const response = await fetch(`/api/reservations/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to cancel reservation');
            }
            return response.json();
        } catch (error) {
            console.error('Error cancelling reservation:', error);
            throw error;
        }
    }

    // Update the location change event listener
    locationSelect.addEventListener('change', function() {
        if (this.value) {
            timeSlotSelect.disabled = false;
            generateTimeSlots();
        } else {
            timeSlotSelect.disabled = true;
            timeSlotSelect.innerHTML = `<option value="">${translations[currentLang].selectTimeDefault}</option>`;
        }
        chairSelection.innerHTML = '';
    });
	
    // Also update the initial state when the page loads
    //timeSlotSelect.innerHTML = `<option value="">${translations[currentLang].selectTimeDefault}</option>`;

		// Add date input change event listener to update available time slots
	dateInput.addEventListener('change', function() {
        if (locationSelect.value) {
            generateTimeSlots();
        }
	});

    // Generate time slots with AM/PM format
   // Update the generateTimeSlots function to only show time slots with available chairs
// Update the generateTimeSlots function
    async function generateTimeSlots() {
        timeSlotSelect.innerHTML = `<option value="">${translations[currentLang].selectTimeAfterLocation}</option>`;
        
        const formattedDate = new Date(dateInput.value).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        try {
            const response = await fetch(
                `/api/available-slots?date=${formattedDate}&location=${locationSelect.value}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch available slots');
            }
            
            const availableSlots = await response.json();
            
            availableSlots.forEach(slot => {
                const option = document.createElement('option');
                option.value = slot;
                option.textContent = slot;
                timeSlotSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error generating time slots:', error);
            showToast('Error loading time slots', 'error');
        }
    }


    async function isChairAvailable(date, location, timeSlot, chair) {
        try {
            const response = await fetch(
                `/api/check-availability?date=${date}&location=${location}&timeSlot=${timeSlot}&chair=${chair}`
            );
            if (!response.ok) {
                throw new Error('Failed to check chair availability');
            }
            const data = await response.json();
            return !data.reserved.includes(chair);
        } catch (error) {
            console.error('Error checking chair availability:', error);
            return false;
        }
    }


    // Update the chair generation code in your timeSlot change event listener
    timeSlotSelect.addEventListener('change', async function() {
        chairSelection.innerHTML = '';
        if (this.value) {
            const numChairs = locationChairs[locationSelect.value] || 0;
            const formattedDate = new Date(dateInput.value).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            for (let i = 1; i <= numChairs; i++) {
                const chair = document.createElement('div');
                chair.className = 'chair';
                const chairText = translations[currentLang].chair(i);
                chair.textContent = chairText;

                const isAvailable = await isChairAvailable(
                    formattedDate, 
                    locationSelect.value, 
                    this.value, 
                    `Chair ${i}`
                );

                if (!isAvailable) {
                    chair.classList.add('reserved');
                    chair.title = 'Already reserved';
                } else {
                    chair.addEventListener('click', function() {
                        if (!chair.classList.contains('reserved')) {
                            document.querySelectorAll('.chair').forEach(c => c.classList.remove('selected'));
                            chair.classList.add('selected');
                        }
                    });
                }
                chairSelection.appendChild(chair);
            }
        }
    });

    // Check reservation button click handler
    document.getElementById('checkReservation').addEventListener('click', async function() {
        const userId = document.getElementById('checkReservationId').value.trim();
        
        if (!userId) {
            showToast('enterEmployeeId', 'error');
            return;
        }
        
        try {
            const response = await fetch(`/api/user-reservations/${userId}`);
            const reservations = await response.json();
            
            if (reservations.length === 0) {
                showToast('noReservationFound', 'error');
                document.getElementById('reservationDetails').innerHTML = '';
                return;
            }
            
            displayReservationDetails(reservations[0]);
        } catch (error) {
            showToast('Error checking reservation', 'error');
        }
    });

    // Handle form submission
    submitButton.addEventListener('click', async function() {
        const date = dateInput.value;
        const location = locationSelect.value;
        const selectedTime = timeSlotSelect.value;
        const selectedChair = document.querySelector('.chair.selected')?.textContent;
        const userId = document.getElementById('userId').value;
        const userName = document.getElementById('userName').value;

        if (!date || !location || !selectedTime || !selectedChair || !userId || !userName) {
            showToast('fillAllFields', 'error');
            return;
        }

        const canReserve = await canUserReserve(userId);
        if (!canReserve) {
            showToast('alreadyReserved', 'error');
            return;
        }

        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        try {
            const reservation = {
                date: formattedDate,
                location,
                timeSlot: selectedTime,
                chair: selectedChair,
                userId,
                userName,
                timestamp: new Date().toISOString()
            };

            await saveReservation(reservation);

            // Update modal content
            document.getElementById('modalDate').textContent = formattedDate;
            document.getElementById('modalLocation').textContent = location;
            document.getElementById('modalTime').textContent = selectedTime;
            document.getElementById('modalChair').textContent = selectedChair;
            document.getElementById('modalUserId').textContent = userId;
            document.getElementById('modalUserName').textContent = userName;

            // Show modal
            modal.classList.add('show');
            
            // Show success toast
            showToast('reservationSuccess', 'success');
        } catch (error) {
            showToast(error.message, 'error');
        }
    });


        // Check if chair is available
        // if (!isChairAvailable(formattedDate, location, selectedTime, selectedChair)) {
        //     showToast('Sorry, this chair has already been reserved for the selected time slot. Please choose another chair or time slot.', 'error');
        //     return;
        // }




        // Show modal
        modal.classList.add('show');
        
        // Show success toast
        showToast('reservationSuccess', 'success');
    });

    // Modal controls
    function closeModal() {
        modal.classList.remove('show');
        resetForm();
    }

    closeBtn.onclick = closeModal;

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }

    // Reset form function
    function resetForm() {
        locationSelect.value = '';
        timeSlotSelect.value = '';
        timeSlotSelect.disabled = true;
        timeSlotSelect.innerHTML = '<option value="">-- First Select Location --</option>';
        document.getElementById('userId').value = '';
        document.getElementById('userName').value = '';
        chairSelection.innerHTML = '';
    }

    // Make handleCancellation globally accessible
    window.handleCancellation = async function(userId) {
        if (confirm(translations[currentLang].confirmCancellation)) {
            try {
                await cancelReservation(userId);
                document.getElementById('reservationDetails').innerHTML = '';
                document.getElementById('checkReservationId').value = '';
                showToast('reservationCancelled', 'success');
            } catch (error) {
                showToast('Error cancelling reservation', 'error');
            }
        }
    };

    // Handle screenshot capture
    captureButton.addEventListener('click', async function() {
        try {
            const element = document.querySelector('.modal-content');
            const canvas = await html2canvas(element);
            const link = document.createElement('a');
            link.download = `reservation-${new Date().getTime()}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
            showToast('screenshotSuccess', 'success');
        } catch (error) {
            console.error('Screenshot capture failed:', error);
            showToast('screenshotFailed', 'error');
        }
    });

    // Handle escape key to close modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Toast notification function
    function showToast(messageKey, type = 'success') {
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());
    
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = translations[currentLang].toastMessages[messageKey];
        document.body.appendChild(toast);
        
        toast.style.animation = 'slideIn 0.5s, fadeOut 0.5s 2.5s';
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
	
	    // Language switcher functionality
    const langToggle = document.getElementById('langToggle');
    let currentLang = 'en';

    function updateLanguage(lang) {
        // Update button text
        langToggle.querySelector('.lang-text').textContent = lang.toUpperCase();

        // Update all translatable elements
        document.querySelector('h1').textContent = translations[lang].title;
        document.querySelector('h2').textContent = translations[lang].myReservations;
        
        // Update labels
        document.querySelector('label[for="date"]').textContent = translations[lang].selectDate;
        document.querySelector('label[for="location"]').textContent = translations[lang].selectLocation;
        document.querySelector('label[for="timeSlot"]').textContent = translations[lang].selectTimeSlot;
        document.querySelector('label[for="userId"]').textContent = translations[lang].employeeId;
        document.querySelector('label[for="userName"]').textContent = translations[lang].indicatorName;

        // Update placeholders
        //document.getElementById('userId').placeholder = translations[lang].employeeIdPlaceholder;
        //document.getElementById('userName').placeholder = translations[lang].indicatorNamePlaceholder;
        document.getElementById('checkReservationId').placeholder = translations[lang].employeeIdPlaceholder;


        // Update helper texts
        document.querySelectorAll('.helper-text').forEach(helper => {
            if (helper.parentElement.querySelector('#date')) {
                helper.textContent = translations[lang].selectDateHelper;
            } else if (helper.parentElement.querySelector('#userId')) {
                helper.textContent = translations[lang].employeeIdPlaceholder;
            } else if (helper.parentElement.querySelector('#userName')) {
                helper.textContent = translations[lang].indicatorNameHelper;
            }
        });

        // Update buttons
        document.getElementById('submitReservation').textContent = translations[lang].submitButton;
        document.getElementById('checkReservation').textContent = translations[lang].checkReservation;

        // Update no reservation message if it exists
        const noReservation = document.querySelector('.no-reservation p');
        if (noReservation) {
            noReservation.textContent = translations[lang].noReservation;
        }


        // Update location dropdown default option
        locationSelect.querySelector('option[value=""]').textContent = translations[lang].selectLocationDefault;

        // Update time slot dropdown based on its state
        if (timeSlotSelect.disabled) {
            timeSlotSelect.innerHTML = `<option value="">${translations[lang].selectTimeDefault}</option>`;
        }


        // Update Select Chair label
        const chairLabel = document.querySelector('label[for="chairSelection"]');
        if (chairLabel) {
            chairLabel.textContent = translations[lang].selectChair;
        }

        // Update existing chair buttons if they exist
        document.querySelectorAll('.chair').forEach((chair, index) => {
            const chairNumber = index + 1;
            if (!chair.classList.contains('reserved')) {
                chair.textContent = translations[lang].chair(chairNumber);
            }
        });

        // Update modal texts
        document.querySelector('.modal-header h2').textContent = translations[lang].reservationSuccessful;
        document.querySelector('.modal-body h3').textContent = translations[lang].reservationDetails;
        
        // Update modal labels
        document.querySelectorAll('.detail-row').forEach(row => {
            const label = row.querySelector('.detail-label');
            switch(label.getAttribute('data-label-type')) {
                case 'date':
                    label.textContent = translations[lang].modalDate;
                    break;
                case 'location':
                    label.textContent = translations[lang].modalLocation;
                    break;
                case 'time':
                    label.textContent = translations[lang].modalTimeSlot;
                    break;
                case 'chair':
                    label.textContent = translations[lang].modalChair;
                    break;
                case 'employeeId':
                    label.textContent = translations[lang].modalEmployeeId;
                    break;
                case 'name':
                    label.textContent = translations[lang].modalName;
                    break;
            }
        });

        // Update capture button
        document.getElementById('captureButton').textContent = translations[lang].captureScreenshot;

        // Update My Reservations section
        document.querySelector('.my-reservations-section h2').textContent = translations[lang].myReservations;
        document.querySelector('.check-button .button-text').textContent = translations[lang].checkReservation;

        // If there's a current reservation displayed, update its text
        const currentReservation = document.querySelector('.reservation-card');
        if (currentReservation) {
            const userId = document.getElementById('checkReservationId').value;
            const reservation = findUserReservation(userId);
            if (reservation) {
                displayReservationDetails(reservation);
            }
        }

    }

    langToggle.addEventListener('click', function() {
        const selectedTime = timeSlotSelect.value; // Store the current selection
        currentLang = currentLang === 'en' ? 'th' : 'en';
        if (locationSelect.value && !timeSlotSelect.value) {
            // Only regenerate time slots if location is selected but no time is selected
            timeSlotSelect.innerHTML = `<option value="">${translations[currentLang].selectTimeAfterLocation}</option>`;
            generateTimeSlots();
        } else if (locationSelect.value && timeSlotSelect.value) {
            // If both location and time are selected, update the options while preserving selection
            const currentOptions = Array.from(timeSlotSelect.options);
            const formattedDate = new Date(dateInput.value).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
            const location = locationSelect.value;
            const totalChairs = locationChairs[location] || 0;
    
            currentOptions.forEach(option => {
                if (option.value === '') {
                    option.text = translations[currentLang].selectTimeAfterLocation;
                } else {
                    const timeSlot = option.value;
                    let availableChairs = 0;
                    for (let i = 1; i <= totalChairs; i++) {
                        if (isChairAvailable(formattedDate, location, timeSlot, `Chair ${i}`)) {
                            availableChairs++;
                        }
                    }
                    const availabilityText = translations[currentLang].chairAvailability(availableChairs);
                    option.text = `${timeSlot} (${availabilityText})`;
                }
            });
        }
        updateLanguage(currentLang);

        //need to add translation of current reservation receipt

    });
});
